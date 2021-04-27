import { BehaviorSubject, Observable, Subject } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { clone } from "./clone";
import { StoreError } from "./error";
import { Selector } from "./selector";

export class EntityStore<State> {
  protected _state: BehaviorSubject<State>;
  protected _isLoading: BehaviorSubject<boolean>;
  protected _error: Subject<StoreError>;

  constructor(state: State) {
    this._state = new BehaviorSubject(clone(state));
  }

  select(): Observable<State>;
  select<T>(selector: Selector<State, T>): Observable<T>;
  select<T>(selector?: Selector<State, T>) {
    if (selector === undefined) {
      return this._state.asObservable().pipe(distinctUntilChanged());
    }

    return this._state
      .asObservable()
      .pipe(map(selector))
      .pipe(distinctUntilChanged());
  }

  getValue(): State;
  getValue<T>(selector: Selector<State, T>): T;
  getValue<T>(selector?: Selector<State, T>) {
    if (selector === undefined) {
      return clone(this._state.value);
    }

    return clone(selector(this._state.value));
  }

  setLoading(loading: boolean) {
    this._isLoading.next(loading);
  }

  setError(error: Error) {
    this._error.next({ error: error });
  }
}
