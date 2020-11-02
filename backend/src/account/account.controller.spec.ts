import { Model } from 'mongoose';
import { AccountController } from './account.controller';
import { AccountService } from './shared/account.service';
import { Account } from './shared/schemas/account.schema';

describe('AccountsController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    service = new AccountService({} as Model<Account>);
    controller = new AccountController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should invoke service.findAll() on .list()', () => {
    jest.spyOn(service, 'findAll').mockImplementation();

    controller.list();

    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
