const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'mock-db.json');

class Store {
  constructor() {
    this.data = this._readData();
  }

  _readData() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const rawData = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(rawData);
      }
    } catch (error) {
      console.error('Error reading mock DB:', error);
    }
    return { scores: [], ministries: {}, council: {}, streak: 0 };
  }

  _writeData() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error writing mock DB:', error);
    }
  }

  getAllScores() {
    return this.data.scores;
  }

  getTodayScore() {
    const scores = this.data.scores;
    return scores.length > 0 ? scores[scores.length - 1] : { score: 0 };
  }

  getAllMinistries() {
    return Object.values(this.data.ministries).map(m => ({
      id: m.id,
      name: m.name,
      avatar: m.avatar,
      status: m.status,
      score: m.score,
      actionsCount: m.actions.length,
      actionsCompleted: m.actions.filter(a => a.completed).length
    }));
  }

  getMinistry(id) {
    return this.data.ministries[id] || null;
  }

  addLog(ministryId, actionText, impact) {
    const ministry = this.data.ministries[ministryId];
    if (ministry) {
      const newLog = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        action: actionText,
        impact: impact || '0%'
      };
      ministry.logs.unshift(newLog); // Add to beginning
      this._writeData();
      return newLog;
    }
    return null;
  }
  
  toggleAction(ministryId, actionId) {
    const ministry = this.data.ministries[ministryId];
    if (ministry) {
        const action = ministry.actions.find(a => a.id === parseInt(actionId));
        if (action) {
            action.completed = !action.completed;
            this._writeData();
            return action;
        }
    }
    return null;
  }

  getCouncilReport() {
    return this.data.council;
  }

  getStreak() {
    return this.data.streak;
  }
}

module.exports = new Store();
