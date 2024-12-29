import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { allUsersResolver } from './allUsers.resolver';
import { User } from '../../Models/user';

describe('allUsersResolver', () => {
  const executeResolver: ResolveFn<User[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => allUsersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
