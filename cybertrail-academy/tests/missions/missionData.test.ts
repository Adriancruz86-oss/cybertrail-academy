import { loadMissionData } from '../../src/services/contentService';
import { expect } from 'chai';

describe('Mission Data Tests', () => {
    it('should load mission data correctly', async () => {
        const missionData = await loadMissionData('splus-c1-m02');
        expect(missionData).to.have.property('title', 'The Missing Website');
        expect(missionData).to.have.property('campaignId', 'first-response');
        expect(missionData).to.have.property('district', 'public-web');
        expect(missionData.concepts).to.include.members(['https', 'tcp-443', 'firewall-rule', 'inbound-traffic']);
    });

    it('should return undefined for non-existent mission', async () => {
        const missionData = await loadMissionData('non-existent-mission');
        expect(missionData).to.be.undefined;
    });

    // Additional tests can be added here
});