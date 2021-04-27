import { StateFn } from "./stateFn";

/**
 * This basically acts as a table.
 * Allows joining multiple entities.
 * */
export class Entity<State> {
  protected _stateFn: StateFn<State>;
  constructor(stateFn: StateFn<State>) {
    this._stateFn = stateFn;
  }

  getInitialState() {
    return this._stateFn();
  }

  join<NewState>(stateFn: StateFn<Partial<State> & NewState>) {
    const mergedFn: StateFn<State & NewState> = () => {
      return { ...this._stateFn(), ...stateFn() };
    };

    return new Entity(mergedFn);
  }
}
