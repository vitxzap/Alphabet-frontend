import { createMachine, setup } from "xstate";
export const SettingsMachine = setup({
  types: {
    events: {} as { type: "SET"; value: string },
  },
}).createMachine({
  id: "settings",
  initial: "general",
  states: {
    session: {},
    profile: {},
    general: {},
  },
  on: {
    SET: [
      { target: ".session", guard: ({ event }) => event.value === "Session" },
      { target: ".general", guard: ({ event }) => event.value === "General" },
      { target: ".profile", guard: ({ event }) => event.value === "Profile" },
    ],
  },
});
