import { Team } from './teams/team.model';

describe('Team', () => {
  it('should be defined', () => {
    expect(new Team()).toBeDefined();
  });
});
