// scenarios for the "Be a Good Friend" empathy game
// each has a situation, a set of responses (some kind, some not), and an explanation

const empathyScenarios = [
  {
    id: 1,
    situation: "Your classmate is upset because the schedule changed suddenly.",
    responses: [
      { id: "a", text: "Say 'Just deal with it, things change!'", isKind: false },
      { id: "b", text: "Tell them what the new plan is and stay calm", isKind: true },
      { id: "c", text: "Laugh because it is not a big deal", isKind: false },
      { id: "d", text: "Offer to help them understand what happens next", isKind: true },
    ],
    explanation: "Sudden changes can be really stressful for autistic people. Staying calm and explaining the new plan helps them feel safe.",
  },
  {
    id: 2,
    situation: "A classmate is playing alone and doing the same thing over and over.",
    responses: [
      { id: "a", text: "Tell them they are being weird", isKind: false },
      { id: "b", text: "Ask if you can join or sit nearby quietly", isKind: true },
      { id: "c", text: "Take away what they are playing with", isKind: false },
      { id: "d", text: "Respect that they might enjoy playing that way", isKind: true },
    ],
    explanation: "Repetitive activities can be calming and enjoyable for autistic people. Respecting this and gently offering to join is the kindest approach.",
  },
  {
    id: 3,
    situation: "During PE, a classmate is struggling with the noise and bright lights in the sports hall.",
    responses: [
      { id: "a", text: "Tell the teacher so they can help", isKind: true },
      { id: "b", text: "Yell at them to toughen up", isKind: false },
      { id: "c", text: "Offer to walk with them to a quieter spot", isKind: true },
      { id: "d", text: "Ignore them completely", isKind: false },
    ],
    explanation: "Sports halls can be overwhelming with echoing sounds and bright lights. Helping them find a quieter space or telling a teacher shows real kindness.",
  },
  {
    id: 4,
    situation: "A new student is autistic and eats the same lunch every single day.",
    responses: [
      { id: "a", text: "Make fun of their food choices", isKind: false },
      { id: "b", text: "Accept it. Everyone has their own preferences", isKind: true },
      { id: "c", text: "Force them to try something new", isKind: false },
      { id: "d", text: "Sit with them and chat about something they enjoy", isKind: true },
    ],
    explanation: "Many autistic people prefer familiar foods because of taste or texture sensitivities. There is nothing wrong with eating the same thing, it is comforting!",
  },
];

export default empathyScenarios;
