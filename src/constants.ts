export const AUTH_SERVICE = Symbol('Post service');
export const EVENTS_SERVICE = Symbol('Events service');
export const EXAMS_SERVICE = Symbol('Exams service');
export const GEARS_SERVICE = Symbol('Gears service');

export type Service =
  | typeof AUTH_SERVICE
  | typeof EVENTS_SERVICE
  | typeof EXAMS_SERVICE
  | typeof GEARS_SERVICE;
