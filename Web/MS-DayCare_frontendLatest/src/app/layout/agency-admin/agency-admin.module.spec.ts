import { AgencyAdminModule } from './agency-admin.module';

describe('DashboardModule', () => {
  let dashboardModule: AgencyAdminModule;

  beforeEach(() => {
    dashboardModule = new AgencyAdminModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
