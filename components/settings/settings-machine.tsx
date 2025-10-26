import { createMachine, setup } from "xstate";
export const SettingsMachine = setup({
  types: {
    events: {} as { type: "SET"; value: string },
  },
}).createMachine({
  id: "settings",
  initial: "profile",
  states: {
    session: {},
    profile: {},
  },
  on: {
    SET: [
      { target: ".session", guard: ({ event }) => event.value === "Session" },
      { target: ".profile", guard: ({ event }) => event.value === "Profile" },
    ],
  },
});
