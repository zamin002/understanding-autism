// branching stories for the "Walk in My Shoes" module
// each story has scenes with choices that lead to different outcomes
// endType "best" = positive ending, "missed" = player could have done better

const stories = [
  {
    id: "lunchtime",
    title: "Lunchtime with Sam",
    emoji: "🍽️",
    color: "#FFE0B2",
    description: "Sam finds the noisy canteen overwhelming. What will you do?",
    scenes: [
      {
        id: 0,
        text: "It's lunchtime at school. You notice Sam sitting alone in the corner of the canteen, covering their ears. The room is really loud today. Sam is autistic and sometimes finds noisy places overwhelming.",
        choices: [
          {
            text: "Walk over and sit next to Sam quietly",
            nextScene: 1,
            points: 2,
          },
          {
            text: "Shout across the room to invite Sam to your table",
            nextScene: 2,
            points: 0,
          },
        ],
      },
      {
        id: 1,
        text: "You sit down next to Sam without making a fuss. Sam looks up and gives you a small smile. After a moment, Sam says quietly: 'It's really loud in here today.'",
        feedback: "Great choice! Approaching calmly shows Sam you understand.",
        choices: [
          {
            text: "Suggest going to a quieter spot together",
            nextScene: 3,
            points: 2,
          },
          {
            text: "Say 'Just ignore the noise, it's not that bad!'",
            nextScene: 4,
            points: 0,
          },
        ],
      },
      {
        id: 2,
        text: "You shout 'HEY SAM! COME SIT WITH US!' from across the room. Sam flinches and covers their ears even more. A few other children stare.",
        feedback: "Shouting can be really overwhelming for someone who is already struggling with noise. A quieter approach would help more.",
        choices: [
          {
            text: "Realise your mistake and walk over quietly instead",
            nextScene: 1,
            points: 1,
          },
          {
            text: "Shrug and go back to eating",
            nextScene: 5,
            points: 0,
          },
        ],
      },
      {
        id: 3,
        text: "You say: 'Want to eat in the library garden? It's much quieter there.' Sam's face lights up. 'Yes please!' You both head outside and enjoy lunch in the sunshine. Sam tells you about their favourite dinosaurs, and you learn something new!",
        feedback: "Amazing! You listened to what Sam needed and found a solution together. That's what a great friend does.",
        isEnding: true,
        points: 3,
        endType: "best",
      },
      {
        id: 4,
        text: "Sam looks hurt and says quietly: 'It IS that bad for me...' then goes back to covering their ears. You realise that what feels okay for you might feel very different for Sam.",
        feedback: "Everyone experiences the world differently. What seems fine to you can be genuinely painful for someone with autism. Listening and believing them is important.",
        choices: [
          {
            text: "Apologise and ask Sam what would help",
            nextScene: 3,
            points: 1,
          },
        ],
      },
      {
        id: 5,
        text: "Sam stays alone for the rest of lunch. Later, you notice Sam seems sad in class. You wonder if you could have done something differently.",
        feedback: "Sometimes doing nothing can leave someone feeling lonely. Small acts of kindness can make a big difference in someone's day.",
        isEnding: true,
        points: 0,
        endType: "missed",
      },
    ],
  },
  {
    id: "group-project",
    title: "The Group Project",
    emoji: "📝",
    color: "#C8E6C9",
    description: "Your group includes Alex, who communicates differently. How do you work together?",
    scenes: [
      {
        id: 0,
        text: "Your teacher puts you in a group for a science project. One member is Alex, who is autistic. Alex doesn't make eye contact when you all start talking, and the other group members look unsure.",
        choices: [
          {
            text: "Ask Alex directly what part of the project they'd like to do",
            nextScene: 1,
            points: 2,
          },
          {
            text: "Divide the work without asking Alex",
            nextScene: 2,
            points: 0,
          },
        ],
      },
      {
        id: 1,
        text: "You ask: 'Alex, what bit sounds most interesting to you?' Alex pauses for a moment, then says: 'I really like drawing. Can I do the diagrams and poster?' You didn't expect that Alex is actually really talented at art!",
        feedback: "Brilliant! Asking directly and giving Alex time to respond shows real respect.",
        choices: [
          {
            text: "Say 'That sounds perfect, you'd be great at that!'",
            nextScene: 3,
            points: 2,
          },
          {
            text: "Say 'Are you sure? The diagrams are quite important...'",
            nextScene: 4,
            points: 0,
          },
        ],
      },
      {
        id: 2,
        text: "You and the others divide up the work between yourselves. Alex sits quietly, looking at the table. When the teacher comes over, she notices Alex hasn't been included.",
        feedback: "When someone is quiet, it doesn't mean they have nothing to contribute. They might just need to be asked in a clear, direct way.",
        choices: [
          {
            text: "Apologise to Alex and ask what they'd like to work on",
            nextScene: 1,
            points: 1,
          },
        ],
      },
      {
        id: 3,
        text: "Alex smiles and immediately starts sketching ideas. The diagrams Alex creates are detailed and creative, the best in the whole class! Your group gets top marks, and everyone contributed their strengths.",
        feedback: "When we include everyone and play to their strengths, the whole group benefits. Alex's unique way of thinking was a superpower for the project!",
        isEnding: true,
        points: 3,
        endType: "best",
      },
      {
        id: 4,
        text: "Alex looks down and goes quiet. Another group member jumps in: 'Let Alex try! Give them a chance.' You feel a bit embarrassed and realise you were doubting Alex without reason.",
        feedback: "Sometimes we underestimate people without meaning to. Trust and encouragement can help everyone do their best.",
        choices: [
          {
            text: "Say 'You're right, sorry Alex, go for it!'",
            nextScene: 3,
            points: 1,
          },
        ],
      },
    ],
  },
  {
    id: "playground",
    title: "Playtime Choices",
    emoji: "🎮",
    color: "#BBDEFB",
    description: "Jamie wants to play the same game every break. Is that okay?",
    scenes: [
      {
        id: 0,
        text: "Every break time, Jamie wants to play the same card game. Some of your friends are getting bored and want to play football instead. Jamie is autistic and really loves routines and this particular game.",
        choices: [
          {
            text: "Suggest a plan: card game one break, football the next",
            nextScene: 1,
            points: 2,
          },
          {
            text: "Tell Jamie everyone is bored of the card game",
            nextScene: 2,
            points: 0,
          },
        ],
      },
      {
        id: 1,
        text: "You suggest taking turns: 'How about we play cards today and football tomorrow?' Jamie thinks about it and says: 'Okay, but can we definitely play cards on Tuesdays and Thursdays?' Your friends agree.",
        feedback: "Great compromise! You found a way that respects Jamie's need for routine while including everyone's wishes.",
        choices: [
          {
            text: "Make a little schedule together so Jamie knows what to expect",
            nextScene: 3,
            points: 2,
          },
          {
            text: "Just say 'We'll figure it out as we go'",
            nextScene: 4,
            points: 1,
          },
        ],
      },
      {
        id: 2,
        text: "Jamie looks upset and walks away. You see Jamie sitting alone by the wall, shuffling the cards. Your friend says: 'Maybe that was a bit harsh...'",
        feedback: "For many autistic people, routines are comforting and help them feel safe. Saying their interest is boring can feel really hurtful.",
        choices: [
          {
            text: "Go over and apologise, then try to find a compromise",
            nextScene: 1,
            points: 1,
          },
        ],
      },
      {
        id: 3,
        text: "You all make a fun weekly schedule on a piece of paper. Jamie decorates it with stickers! Now everyone knows what to expect, and Jamie feels much more relaxed. Break times become fun for everyone.",
        feedback: "You found a creative solution that helps everyone! Visual schedules and predictability really help autistic people feel comfortable.",
        isEnding: true,
        points: 3,
        endType: "best",
      },
      {
        id: 4,
        text: "Over the next few days, the plan keeps changing and Jamie gets anxious not knowing what's happening. Eventually Jamie stops coming to play altogether.",
        feedback: "Without a clear plan, Jamie felt uncertain and anxious. Autistic people often feel much better when they know what to expect. A simple schedule could have fixed this!",
        isEnding: true,
        points: 0,
        endType: "missed",
      },
    ],
  },
];

export default stories;
