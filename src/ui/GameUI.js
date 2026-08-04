export class GameUI {
    constructor() {
        this.root = document.createElement('div');
        this.root.id = 'game-ui';
        this.root.innerHTML = `
      <section class="status-panel" aria-live="polite"></section>
      <section class="mission-panel"></section>
      <section class="sidebar-panel">
        <div class="panel-header">CyberDex</div>
        <div class="cyberdex-content"></div>
        <div class="panel-header">Competency Matrix</div>
        <div class="competency-content"></div>
      </section>
      <div class="notification-panel" aria-live="assertive"></div>
    `;
        document.body.appendChild(this.root);
        this.statusPanel = this.root.querySelector('.status-panel');
        this.missionPanel = this.root.querySelector('.mission-panel');
        this.cyberdexPanel = this.root.querySelector('.cyberdex-content');
        this.competencyPanel = this.root.querySelector('.competency-content');
        this.notificationPanel = this.root.querySelector('.notification-panel');
    }
    static init() {
        if (!GameUI.instance) {
            GameUI.instance = new GameUI();
        }
        return GameUI.instance;
    }
    static get() {
        return GameUI.init();
    }
    updateStatus(state) {
        this.statusPanel.innerHTML = `
      <div class="status-card"><strong>Analyst:</strong> ${state.displayName}</div>
      <div class="status-card"><strong>Rank:</strong> ${state.rank.replace(/-/g, ' ')}</div>
      <div class="status-card"><strong>XP:</strong> ${state.xp}</div>
    `;
    }
    updateMissionLog(mission) {
        if (!mission) {
            this.missionPanel.innerHTML = `
        <div class="panel-header">Mission log</div>
        <p>No active mission selected.</p>
      `;
            return;
        }
        this.missionPanel.innerHTML = `
      <div class="panel-header">Mission log</div>
      <h2>${mission.title}</h2>
      <p>${mission.description}</p>
      <div class="mission-objectives">
        ${mission.objectives.map((objective) => `<div class="objective">• ${objective}</div>`).join('')}
      </div>
    `;
    }
    updateCyberDex(concepts, progress) {
        const entries = Object.values(concepts)
            .filter((concept) => progress[concept.conceptId]?.status !== 'unknown')
            .slice(0, 8);
        if (entries.length === 0) {
            this.cyberdexPanel.innerHTML = '<p class="empty-state">No concepts discovered yet.</p>';
            return;
        }
        this.cyberdexPanel.innerHTML = entries
            .map((concept) => {
            const status = progress[concept.conceptId]?.status ?? 'unknown';
            return `
          <article class="cyberdex-card">
            <div class="cyberdex-title">${concept.name}</div>
            <div class="cyberdex-status">${status}</div>
            <p>${concept.plainDefinition}</p>
          </article>
        `;
        })
            .join('');
    }
    updateCompetencyMatrix(concepts, progress) {
        const tiles = Object.values(concepts)
            .filter((concept) => progress[concept.conceptId]?.status !== 'unknown')
            .slice(0, 12);
        if (tiles.length === 0) {
            this.competencyPanel.innerHTML = '<p class="empty-state">No competency progress yet.</p>';
            return;
        }
        this.competencyPanel.innerHTML = tiles
            .map((concept) => {
            const status = progress[concept.conceptId]?.status ?? 'unknown';
            return `<div class="competency-tile competency-${status}">${concept.name}<span>${status}</span></div>`;
        })
            .join('');
    }
    showNotification(message) {
        this.notificationPanel.textContent = message;
        this.notificationPanel.classList.add('visible');
        window.clearTimeout(this.notificationPanel._timeout);
        this.notificationPanel._timeout = window.setTimeout(() => {
            this.notificationPanel.classList.remove('visible');
        }, 3000);
    }
}
GameUI.instance = null;
//# sourceMappingURL=GameUI.js.map