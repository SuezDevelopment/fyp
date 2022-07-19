export const INCREMENT = "INCREMENT";
export const STOP = "STOP";
export function reducer(state = 0, action) {
   switch (action.type) {
      case INCREMENT:
         return state + 1;
      case STOP:
         return state;
      default:
         return state;
    }
}