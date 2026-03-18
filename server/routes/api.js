const express = require('express');
const router = express.Router();
const { Ministry, Action, Log, DailySnapshot, CouncilReport } = require('../models');

// GET /api/dashboard - Aggregated data for the main dashboard view
router.get('/dashboard', async (req, res) => {
    try {
        // Fetch last 7 daily snapshots for the trend line
        const snapshots = await DailySnapshot.find().sort({ date: -1 }).limit(7);
        const trend = snapshots.reverse().map(s => ({ date: s.date.toISOString().split('T')[0], score: s.laurelScore }));
        const todayScore = trend.length > 0 ? trend[trend.length - 1].score : 0;

        // Fetch all ministries
        const ministriesData = await Ministry.find();
        
        // Build the ministry summaries (calculating active actions completed today)
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const ministries = await Promise.all(ministriesData.map(async (m) => {
            const actions = await Action.find({ ministryId: m._id, isActive: true });
            const completedLogs = await Log.find({ 
                ministryId: m._id, 
                type: 'action_completion',
                date: { $gte: today }
            });
            const completedActionIds = completedLogs.map(l => l.actionId.toString());
            
            // Dummy status and score for dashboard card display (in a real app, calculate this dynamically)
            return {
                id: m.slug,
                name: m.name,
                avatar: m.avatar,
                status: 'steady', // Placeholder
                score: 80, // Placeholder
                actionsCount: actions.length,
                actionsCompleted: completedActionIds.length
            };
        }));

        res.json({
            todayScore: todayScore,
            trend: trend,
            ministries: ministries,
            streak: 0 // Placeholder logic for streak
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// GET /api/ministry/:id - Details for a specific ministry
router.get('/ministry/:id', async (req, res) => {
    try {
        const ministry = await Ministry.findOne({ slug: req.params.id });
        if (!ministry) {
            return res.status(404).json({ error: 'Ministry not found' });
        }

        const actions = await Action.find({ ministryId: ministry._id, isActive: true });
        const logs = await Log.find({ ministryId: ministry._id }).sort({ date: -1 }).limit(20);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const completedLogs = await Log.find({ 
            ministryId: ministry._id, 
            type: 'action_completion',
            date: { $gte: today }
        });
        const completedActionIds = completedLogs.map(l => l.actionId.toString());

        // Map actions to the frontend expectation format
        const mappedActions = actions.map(a => ({
            id: a._id,
            text: a.text,
            completed: completedActionIds.includes(a._id.toString())
        }));

        // Map logs
        const mappedLogs = logs.map(l => ({
            id: l._id,
            date: l.date.toISOString().split('T')[0],
            action: l.text || (l.type === 'action_completion' ? 'Action Completed' : 'Manual Log'),
            impact: l.impact || '0%'
        }));

        res.json({
            id: ministry.slug,
            name: ministry.name,
            avatar: ministry.avatar,
            status: 'steady',
            score: 85,
            actions: mappedActions,
            logs: mappedLogs
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching ministry' });
    }
});

// POST /api/ministry/:id/logs - Add a log to a ministry
router.post('/ministry/:id/logs', async (req, res) => {
    try {
        const { action, impact } = req.body;
        if (!action) {
            return res.status(400).json({ error: 'Log action is required' });
        }

        const ministry = await Ministry.findOne({ slug: req.params.id });
        if (!ministry) return res.status(404).json({ error: 'Ministry not found' });

        const newLog = new Log({
            ministryId: ministry._id,
            type: 'manual_log',
            text: action,
            impact: impact || '0%'
        });
        await newLog.save();

        res.status(201).json({
            id: newLog._id,
            date: newLog.date.toISOString().split('T')[0],
            action: newLog.text,
            impact: newLog.impact
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add log' });
    }
});

// PUT /api/ministry/:id/actions/:actionId/toggle - Toggle action completion
router.put('/ministry/:id/actions/:actionId/toggle', async (req, res) => {
    try {
        const ministry = await Ministry.findOne({ slug: req.params.id });
        const action = await Action.findById(req.params.actionId);
        
        if (!ministry || !action) {
            return res.status(404).json({ error: 'Ministry or Action not found' });
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        // Check if a completion log exists for today
        const existingLog = await Log.findOne({
            ministryId: ministry._id,
            actionId: action._id,
            type: 'action_completion',
            date: { $gte: today }
        });

        let isCompleted = false;
        if (existingLog) {
            // Un-toggle by deleting the log
            await Log.findByIdAndDelete(existingLog._id);
        } else {
            // Toggle by creating a log
            const completionLog = new Log({
                ministryId: ministry._id,
                actionId: action._id,
                type: 'action_completion',
                date: new Date()
            });
            await completionLog.save();
            isCompleted = true;
        }

        res.json({ id: action._id, text: action.text, completed: isCompleted });
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle action' });
    }
});

// GET /api/council - Weekly Council Report
router.get('/council', async (req, res) => {
    try {
        const report = await CouncilReport.findOne().sort({ weekStart: -1 });
        const ministriesData = await Ministry.find();
        
        // Mock fallback if no report
        const finalReport = report || {
            weekStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            weekEnd: new Date().toISOString(),
            overallScore: 0,
            previousWeekScore: 0,
            verdict: "Awaiting your first weekly audit. Complete a full week to generate insights.",
            directives: ["Complete 7 days of logs", "Review performance at week end"],
            failures: ["No failures recorded yet"],
            patterns: ["Waiting for more data points"]
        };

        const mappedMinistries = ministriesData.map(m => ({
            id: m.slug,
            name: m.name,
            score: 0 
        }));

        res.json({
            report: finalReport,
            ministriesBreakdown: mappedMinistries
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch council report' });
    }
});

module.exports = router;
