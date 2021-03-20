import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface Person {
    age: number,
    name: string
}

export interface PeopleState {
    people: Array<Person>;
}

interface AddPersonAction {
    type: 'ADD_PERSON',
    person: Person;
}

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addPerson: (personToAdd: Person) => ({ type: 'ADD_PERSON', person: personToAdd } as AddPersonAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<PeopleState> = (state: PeopleState | undefined, incomingAction: Action): PeopleState => {

    if (state === undefined) {
        return {
            people: []
        }
    }

    const action = incomingAction as AddPersonAction;
    switch (action.type) {
        case 'ADD_PERSON':
            return {
                ...state,
                people: [...state.people, action.person]
            }
        default:
            return state;
    }
};
