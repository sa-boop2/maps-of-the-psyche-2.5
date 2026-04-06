// ============================================================
// PSYCHOTHERAPY DATA — Comprehensive therapy modalities
// CBT, DBT, ACT, Psychodynamic, EMDR, IFS, Gestalt, Somatic
// ============================================================
window.PsycheData = window.PsycheData || {};

window.PsycheData.therapies = [
  {
    id: 'cbt',
    name: 'Cognitive Behavioral Therapy',
    shortName: 'CBT',
    icon: '🧠',
    color: '#4c8cd4',
    founder: 'Aaron T. Beck (1960s)',
    tradition: 'Western / Evidence-Based',
    corePremise: 'Our thoughts, feelings, and behaviors are interconnected. Distorted thinking patterns (cognitive distortions) create emotional suffering. By identifying and restructuring these thoughts, we can change how we feel and act.',
    theory: {
      model: 'The Cognitive Triangle: Thoughts → Feelings → Behaviors form a self-reinforcing cycle. Negative automatic thoughts (NATs) arise from deeper core beliefs formed in childhood. These beliefs act as lenses that distort how we interpret events.',
      keyPrinciples: [
        'Psychological problems are partly based on faulty or unhelpful ways of thinking',
        'Psychological problems are partly based on learned patterns of unhelpful behavior',
        'People can learn better coping mechanisms and relieve symptoms',
        'The focus is on changing current patterns rather than analyzing the past',
        'Treatment is collaborative, structured, and time-limited (typically 12-20 sessions)'
      ],
      cognitiveDistortions: [
        { name: 'All-or-Nothing Thinking', description: 'Seeing things in black-and-white categories. If performance falls short of perfect, you see yourself as a total failure.', example: '"I made one mistake in my presentation, so the whole thing was a disaster."' },
        { name: 'Catastrophizing', description: 'Expecting the worst possible outcome. Magnifying the importance of problems and minimizing positives.', example: '"My headache must be a brain tumor." / "If I fail this exam, my life is over."' },
        { name: 'Mind Reading', description: 'Assuming you know what others are thinking without evidence. Usually assuming they think negatively about you.', example: '"Everyone at the party thought I was boring."' },
        { name: 'Emotional Reasoning', description: 'Believing something must be true because you feel it strongly, regardless of evidence.', example: '"I feel like a failure, therefore I am a failure."' },
        { name: 'Should Statements', description: 'Rigid rules about how you or others "should" behave. Creates guilt (self-directed) or resentment (other-directed).', example: '"I should always be productive." / "They should have known better."' },
        { name: 'Personalization', description: 'Taking responsibility for events outside your control. Blaming yourself for others\' behavior.', example: '"My friend is in a bad mood — I must have done something wrong."' },
        { name: 'Overgeneralization', description: 'Drawing broad conclusions from a single event. Using words like "always," "never," "everyone."', example: '"I got rejected once, so no one will ever love me."' },
        { name: 'Mental Filter', description: 'Focusing exclusively on negatives while ignoring positives. Like a filter that only lets through bad news.', example: 'Getting 9 compliments and 1 criticism but dwelling only on the criticism.' },
        { name: 'Disqualifying the Positive', description: 'Rejecting positive experiences by insisting they "don\'t count." Maintaining negative beliefs despite contradictory evidence.', example: '"They only said that to be nice." / "That success was just luck."' },
        { name: 'Labeling', description: 'Attaching a fixed, global label to yourself or others instead of describing the specific behavior.', example: '"I\'m a loser" instead of "I didn\'t succeed at this particular task."' }
      ]
    },
    techniques: [
      { name: 'Thought Records', description: 'A structured worksheet for capturing and examining negative automatic thoughts. You record the situation, your automatic thought, the emotion it triggered, evidence for and against the thought, and a more balanced alternative thought.', steps: ['Identify the triggering situation', 'Notice the automatic thought', 'Rate the emotion (0-100%)', 'List evidence FOR the thought', 'List evidence AGAINST the thought', 'Create a balanced alternative thought', 'Re-rate the emotion'] },
      { name: 'Behavioral Experiments', description: 'Testing negative predictions by deliberately doing what you fear and observing the actual outcome. This generates real-world evidence against distorted beliefs.', steps: ['Identify your negative prediction', 'Design an experiment to test it', 'Predict what will happen (and rate belief 0-100%)', 'Carry out the experiment', 'Record what actually happened', 'Compare prediction vs. reality', 'Update your belief'] },
      { name: 'Behavioral Activation', description: 'Scheduling pleasurable and mastery activities to break the cycle of depression and withdrawal. Action precedes motivation — you don\'t wait to feel like it.', steps: ['Track your current daily activities and mood', 'Identify activities that give pleasure or accomplishment', 'Schedule these activities into your week', 'Rate mood before and after each activity', 'Gradually increase activity level', 'Notice the mood-activity connection'] },
      { name: 'Exposure Hierarchy', description: 'Gradually facing feared situations in a structured way, starting with less anxiety-provoking situations and working up. Anxiety naturally decreases with repeated exposure.', steps: ['List all feared situations', 'Rate each on a 0-100 anxiety scale (SUDS)', 'Arrange from least to most anxiety-provoking', 'Begin with the lowest item', 'Stay in the situation until anxiety drops by 50%', 'Repeat until manageable, then move to next item'] },
      { name: 'Cognitive Restructuring', description: 'Systematically challenging and replacing distorted thoughts with more realistic and balanced ones using Socratic questioning.', steps: ['What is the evidence for this thought?', 'What is the evidence against it?', 'Is there an alternative explanation?', 'What would I tell a friend in this situation?', 'What is the worst/best/most realistic outcome?', 'What is the effect of believing this thought?'] },
      { name: 'Downward Arrow Technique', description: 'Uncovering core beliefs by repeatedly asking "If that were true, what would it mean?" until you reach the underlying belief driving the distress.', steps: ['Start with a negative automatic thought', 'Ask: "If that were true, what would it mean about me?"', 'Take the answer and ask the same question again', 'Continue until you reach a core belief (usually 4-6 levels)', 'The core belief is often about being unlovable, helpless, or worthless'] }
    ],
    exercises: [
      {
        name: 'The 3-Column Thought Record',
        description: 'A quick daily practice to catch and examine your thinking patterns.',
        prompt: 'Think of a recent moment when you felt a strong negative emotion. Fill in:',
        fields: [
          { label: 'Situation — What happened? Where were you? Who was there?', key: 'situation' },
          { label: 'Automatic Thought — What went through your mind? What were you telling yourself?', key: 'thought' },
          { label: 'Emotion & Intensity — What did you feel? Rate 0-100%', key: 'emotion' },
          { label: 'Evidence Against — What facts contradict this thought?', key: 'evidence' },
          { label: 'Balanced Thought — What is a more realistic, balanced way to see this?', key: 'balanced' }
        ]
      },
      {
        name: 'Cognitive Distortion Spotter',
        description: 'Review your recent negative thoughts and identify which cognitive distortions are at play.',
        prompt: 'Write down 3 negative thoughts you had today, then identify which distortion(s) each one contains:',
        fields: [
          { label: 'Negative Thought #1', key: 'neg1' },
          { label: 'Which distortion(s)? (e.g., Catastrophizing, Mind Reading, etc.)', key: 'dist1' },
          { label: 'Negative Thought #2', key: 'neg2' },
          { label: 'Which distortion(s)?', key: 'dist2' },
          { label: 'Negative Thought #3', key: 'neg3' },
          { label: 'Which distortion(s)?', key: 'dist3' }
        ]
      }
    ],
    whenToUse: ['Depression', 'Anxiety disorders (GAD, Social Anxiety, Panic)', 'Phobias', 'OCD', 'PTSD', 'Insomnia', 'Eating disorders', 'Anger management', 'Low self-esteem'],
    limitations: 'CBT can be overly rationalistic — it may not address deep emotional wounds, relational patterns, or meaning-making. Some people find the structured format restrictive. Trauma survivors may need stabilization before cognitive work. It is most effective for specific, identifiable thought patterns rather than diffuse existential distress.',
    evidenceBase: 'The most extensively researched therapy modality. Strong evidence for depression, anxiety, PTSD, OCD, insomnia, and many other conditions. Over 2,000 RCTs published. Recommended as first-line treatment by NICE, APA, and WHO.',
    keyTexts: ['Feeling Good — David Burns', 'Mind Over Mood — Greenberger & Padesky', 'Cognitive Therapy of Depression — Aaron Beck', 'The Feeling Good Handbook — David Burns'],
    psycheMapLink: { framework: 'freud', layer: 2, note: 'CBT works primarily at the Ego/Superego boundary — restructuring the internalized critic and reality-testing function.' }
  },
  {
    id: 'dbt',
    name: 'Dialectical Behavior Therapy',
    shortName: 'DBT',
    icon: '☯',
    color: '#9a4cd4',
    founder: 'Marsha Linehan (1980s)',
    tradition: 'Western + Zen Buddhist',
    corePremise: 'The central dialectic: you must accept yourself exactly as you are AND simultaneously work to change. Radical acceptance and change are not contradictions — they are both necessary. DBT was created for people who feel emotions so intensely that other therapies fail.',
    theory: {
      model: 'Biosocial Theory: Emotional dysregulation arises from a biologically sensitive temperament + an invalidating environment. The person has intense emotions AND was taught those emotions are wrong. DBT teaches skills in four modules to build a "life worth living."',
      keyPrinciples: [
        'Dialectical thinking: two opposing truths can coexist (acceptance AND change)',
        'Validation is essential before any change can happen',
        'Emotional sensitivity is not a flaw — it is a biological reality that needs skill-building',
        'Behavior is purposeful, even self-destructive behavior (it serves a function)',
        'Skills training is as important as individual therapy'
      ],
      fourModules: [
        { name: 'Mindfulness', description: 'The core skill. Learning to observe your inner experience without judgment. Based on Zen Buddhist practice. Being present rather than reactive.', keySkills: ['Observe (just notice)', 'Describe (put words on experience)', 'Participate (engage fully)', 'Non-judgmentally', 'One-mindfully', 'Effectively'] },
        { name: 'Distress Tolerance', description: 'Surviving crisis moments without making things worse. Not about fixing the pain but about enduring it without destructive action.', keySkills: ['TIPP (Temperature, Intense exercise, Paced breathing, Progressive relaxation)', 'STOP skill (Stop, Take a step back, Observe, Proceed mindfully)', 'Pros and Cons of crisis behavior', 'Radical Acceptance', 'Self-soothing with 5 senses', 'ACCEPTS (Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts, Sensations)'] },
        { name: 'Emotion Regulation', description: 'Understanding and managing emotions rather than being controlled by them. Reducing emotional vulnerability and increasing positive experiences.', keySkills: ['ABC PLEASE (Accumulate positives, Build mastery, Cope ahead, treat PhysicaL illness, balance Eating, avoid mood-Altering substances, balance Sleep, get Exercise)', 'Check the Facts', 'Opposite Action', 'Problem Solving', 'Naming and labeling emotions'] },
        { name: 'Interpersonal Effectiveness', description: 'Getting what you need from relationships while maintaining self-respect and the relationship itself.', keySkills: ['DEAR MAN (Describe, Express, Assert, Reinforce, be Mindful, Appear confident, Negotiate)', 'GIVE (be Gentle, act Interested, Validate, use Easy manner)', 'FAST (be Fair, no Apologies, Stick to values, be Truthful)'] }
      ]
    },
    techniques: [
      { name: 'Radical Acceptance', description: 'Fully accepting reality as it is, even when painful. Not approval, not giving up, not liking it — just acknowledging what IS. Pain + Non-acceptance = Suffering. Pain + Acceptance = just Pain.', steps: ['Notice you are fighting reality ("This shouldn\'t be happening")', 'Remind yourself that reality is what it is', 'Turn your mind toward acceptance (this may take many turns)', 'Practice half-smile and willing hands (body leads mind)', 'Use the mantra: "It is what it is, and I can handle it"'] },
      { name: 'Opposite Action', description: 'When an emotion is unjustified or unhelpful, deliberately act OPPOSITE to the emotion\'s action urge. This changes the emotion itself.', steps: ['Identify the emotion and its action urge', 'Check if the emotion fits the facts', 'If it does NOT fit the facts (or acting on it would be harmful):', 'Identify the opposite action', 'Do the opposite action ALL THE WAY', 'Repeat until the emotion changes'] },
      { name: 'TIPP for Crisis', description: 'A rapid physiological intervention for moments of extreme emotional intensity. Changes body chemistry within minutes.', steps: ['Temperature: Hold ice cubes, splash cold water on face, or cold shower', 'Intense Exercise: Sprint, jumping jacks, anything that raises heart rate for 20+ minutes', 'Paced Breathing: Breathe out longer than you breathe in (e.g., 4 counts in, 6 counts out)', 'Progressive Muscle Relaxation: Systematically tense and release each muscle group'] },
      { name: 'Wise Mind', description: 'Finding the synthesis between Emotion Mind (hot, reactive) and Reasonable Mind (cold, logical). Wise Mind is the intuitive knowing that integrates both.', steps: ['Notice which mind you are in right now', 'If in Emotion Mind: add some logic and facts', 'If in Reasonable Mind: add some emotional awareness', 'Ask: "What does my Wise Mind know about this?"', 'Listen to the quiet, centered voice underneath the noise'] }
    ],
    exercises: [
      {
        name: 'Emotion Diary Card',
        description: 'Track your emotions daily to build awareness and identify patterns.',
        prompt: 'Rate each emotion from 0 (not at all) to 5 (extremely intense) for today:',
        fields: [
          { label: 'Joy / Happiness (0-5)', key: 'joy' },
          { label: 'Sadness (0-5)', key: 'sadness' },
          { label: 'Anger (0-5)', key: 'anger' },
          { label: 'Fear / Anxiety (0-5)', key: 'fear' },
          { label: 'Shame (0-5)', key: 'shame' },
          { label: 'What triggered the strongest emotion today?', key: 'trigger' },
          { label: 'What skill did you use (or could have used)?', key: 'skill' }
        ]
      },
      {
        name: 'Radical Acceptance Practice',
        description: 'Practice accepting a current source of pain or frustration.',
        prompt: 'Choose something you are currently resisting or fighting against:',
        fields: [
          { label: 'What reality are you struggling to accept?', key: 'reality' },
          { label: 'What does your non-acceptance sound like? ("This shouldn\'t be...")', key: 'resistance' },
          { label: 'What would full acceptance of this look like? (Not approval — just acknowledgment)', key: 'acceptance' },
          { label: 'What opens up for you when you stop fighting this reality?', key: 'opening' }
        ]
      }
    ],
    whenToUse: ['Borderline Personality Disorder', 'Chronic suicidal ideation', 'Self-harm', 'Intense emotional dysregulation', 'Eating disorders', 'Substance abuse with emotional sensitivity', 'PTSD with emotional flooding', 'Relationship instability'],
    limitations: 'DBT is resource-intensive (requires individual therapy + group skills training + phone coaching). The full protocol requires trained DBT therapists and is expensive. Skills alone without the therapeutic relationship may have limited effect for severe presentations.',
    evidenceBase: 'Strong evidence for BPD, self-harm, suicidal behavior. Growing evidence for eating disorders, substance abuse, PTSD, and depression. DBT is the only therapy with replicated RCT evidence for reducing suicide attempts in BPD populations.',
    keyTexts: ['The Dialectical Behavior Therapy Skills Workbook — McKay, Wood & Brantley', 'DBT Skills Training Manual — Marsha Linehan', 'Building a Life Worth Living — Marsha Linehan (memoir)'],
    psycheMapLink: { framework: 'buddhist', layer: 2, note: 'DBT integrates Buddhist mindfulness with Western behavioral science — working at the level of Saññā (perception) and Vedanā (feeling-tone).' }
  },
  {
    id: 'act',
    name: 'Acceptance & Commitment Therapy',
    shortName: 'ACT',
    icon: '🧭',
    color: '#4cd49a',
    founder: 'Steven Hayes (1980s)',
    tradition: 'Western / Third-Wave Behavioral',
    corePremise: 'The goal is not to eliminate difficult feelings but to develop psychological flexibility — the ability to be present, open to experience, and do what matters. Suffering comes not from pain itself, but from our attempts to avoid, control, or fuse with painful thoughts and feelings.',
    theory: {
      model: 'The Hexaflex: Six core processes interact to create psychological flexibility (health) or inflexibility (pathology). The goal is not symptom reduction but a rich, full, meaningful life even in the presence of pain.',
      keyPrinciples: [
        'Pain is inevitable; suffering is optional (suffering = pain × resistance)',
        'Thoughts are just thoughts — not facts, not commands, not you',
        'Trying to control or eliminate unwanted thoughts/feelings makes them worse (the struggle IS the problem)',
        'Values are freely chosen directions, not goals to achieve',
        'Committed action toward values is what gives life meaning',
        'The self is the context for experience, not the content of experience'
      ],
      hexaflex: [
        { name: 'Acceptance', description: 'Opening up to unwanted private experiences (thoughts, feelings, urges, sensations) without trying to suppress, avoid, or change them.', opposite: 'Experiential Avoidance' },
        { name: 'Cognitive Defusion', description: 'Learning to step back from thoughts and see them as mental events rather than literal truths or commands.', opposite: 'Cognitive Fusion' },
        { name: 'Present Moment', description: 'Flexible, voluntary attention to the here-and-now. Engaging fully with what is happening rather than being lost in the past or future.', opposite: 'Dominance of Past/Future' },
        { name: 'Self-as-Context', description: 'Connecting with the observing self — the "you" that is aware of all experiences but is not defined by any of them.', opposite: 'Attachment to Self-story' },
        { name: 'Values', description: 'Clarifying what truly matters to you — the qualities of action you want to embody across life domains.', opposite: 'Lack of Values Clarity' },
        { name: 'Committed Action', description: 'Taking effective action guided by values, even in the presence of difficult thoughts and feelings.', opposite: 'Inaction / Impulsivity / Avoidance' }
      ]
    },
    techniques: [
      { name: 'Defusion Techniques', description: 'Creating distance between you and your thoughts so they have less impact and influence.', steps: ['Name the story: "Ah, there\'s the I\'m-not-good-enough story again"', 'Say the thought slowly, then very fast, then in a funny voice', 'Prefix with: "I notice I\'m having the thought that..."', 'Thank your mind: "Thanks for that thought, Mind"', 'Visualize thoughts as leaves on a stream, floating by', 'Ask: "Is this thought helpful right now?"'] },
      { name: 'Values Clarification', description: 'Discovering what truly matters to you — not goals, not "shoulds," but the directions you want to move in life.', steps: ['Consider domains: Relationships, Work, Growth, Health, Community, Spirituality, Play', 'For each: "If I could live any way I wanted, what kind of person would I be?"', 'Distinguish values from goals (values = directions, goals = destinations)', 'Rate how important each value is (1-10)', 'Rate how much you are living each value (1-10)', 'The gap reveals your growth edge'] },
      { name: 'The Choice Point', description: 'At any moment you can move TOWARD your values (even when it\'s hard) or AWAY from them (even when it feels easier).', steps: ['Notice you are at a choice point (something difficult has shown up)', 'Identify what is showing up internally (thoughts, feelings, urges)', 'Ask: "What do my values call for right now?"', 'Notice the pull toward avoidance ("away moves")', 'Choose a "toward move" — an action guided by values', 'Take the smallest step possible in the values direction'] },
      { name: 'Willingness Scale', description: 'Rating your willingness to have difficult experiences in service of your values.', steps: ['Identify the difficult thought/feeling/sensation', 'On a scale of 0-10, how willing are you to have this experience?', 'If below 7, gently explore: "What would I need to be willing to do this?"', 'Remember: willingness is not wanting — you can be willing without liking it', 'Willingness is all-or-nothing: you are either willing or you are not'] }
    ],
    exercises: [
      {
        name: 'Values Bull\'s-Eye',
        description: 'Map how closely your actions align with your values in key life domains.',
        prompt: 'For each life domain, rate how much you are living in alignment with your values (1 = completely off target, 10 = bull\'s-eye):',
        fields: [
          { label: 'Relationships / Family / Love', key: 'relationships' },
          { label: 'Work / Career / Education', key: 'work' },
          { label: 'Personal Growth / Health', key: 'growth' },
          { label: 'Fun / Recreation / Creativity', key: 'fun' },
          { label: 'Spirituality / Meaning / Purpose', key: 'spirituality' },
          { label: 'What is ONE small action you could take this week to move closer to the bull\'s-eye in your lowest-rated domain?', key: 'action' }
        ]
      },
      {
        name: 'Thought Defusion Practice',
        description: 'Practice seeing thoughts as thoughts rather than facts.',
        prompt: 'Write a negative thought you frequently have and practice defusing from it:',
        fields: [
          { label: 'The negative thought (stated as you normally think it)', key: 'thought' },
          { label: 'Now rewrite it starting with: "I notice I\'m having the thought that..."', key: 'defused' },
          { label: 'If this thought were a character, what would it look like? Give it a name.', key: 'character' },
          { label: 'Is this thought USEFUL right now? Does acting on it move you toward or away from your values?', key: 'useful' }
        ]
      }
    ],
    whenToUse: ['Depression (especially chronic)', 'Anxiety disorders', 'Chronic pain', 'Substance abuse', 'Work-related stress and burnout', 'Existential distress', 'Values confusion / "feeling stuck"', 'OCD', 'Health anxiety'],
    limitations: 'ACT can feel abstract or philosophical for some people. The metaphor-heavy approach does not suit everyone. Less structured than CBT, which some find disorienting. The evidence base, while growing, is smaller than CBT\'s.',
    evidenceBase: 'Growing evidence across many conditions. Strong for chronic pain, depression, anxiety, substance abuse. Over 350 RCTs. Recognized as evidence-based by APA Division 12. Particularly effective for people who have not responded well to traditional CBT.',
    keyTexts: ['The Happiness Trap — Russ Harris', 'Get Out of Your Mind and Into Your Life — Steven Hayes', 'A Liberated Mind — Steven Hayes', 'ACT Made Simple — Russ Harris'],
    psycheMapLink: { framework: 'buddhist', layer: 4, note: 'ACT is deeply aligned with Buddhist non-attachment and the observing self, working at the Viññāṇa (consciousness) level.' }
  },
  {
    id: 'psychodynamic',
    name: 'Psychodynamic Therapy',
    shortName: 'Psychodynamic',
    icon: '🪞',
    color: '#d4884c',
    founder: 'Sigmund Freud (1890s), evolved by many',
    tradition: 'Western / Depth Psychology',
    corePremise: 'Much of our mental life is unconscious. Early relationship patterns create templates ("internal working models") that we repeat throughout life without awareness. Making the unconscious conscious — through the therapeutic relationship itself — frees us from these repetitive patterns.',
    theory: {
      model: 'Current suffering is shaped by unconscious processes rooted in early experiences. The therapeutic relationship becomes a live laboratory where these patterns emerge (transference) and can be examined and changed. Insight alone is not enough — emotional experience in the room is what heals.',
      keyPrinciples: [
        'The unconscious profoundly influences thoughts, feelings, and behavior',
        'Early relationships shape templates for all future relationships',
        'Defenses protect us from painful awareness but also keep us stuck',
        'Transference: we relate to the therapist as we related to important early figures',
        'Countertransference: the therapist\'s emotional responses provide diagnostic information',
        'Change comes through emotional experience, not just intellectual insight',
        'Symptoms are meaningful — they communicate something important'
      ]
    },
    techniques: [
      { name: 'Free Association', description: 'Speaking whatever comes to mind without censoring. The goal is to bypass conscious defenses and access unconscious material.', steps: ['Relax and let thoughts flow freely', 'Say whatever comes to mind, no matter how trivial or embarrassing', 'Notice where you hesitate or go blank (these are points of resistance)', 'Follow the thread wherever it leads', 'The therapist listens for patterns and connections'] },
      { name: 'Transference Analysis', description: 'Examining how you relate to the therapist and connecting these patterns to early relationships.', steps: ['Notice feelings toward the therapist (positive or negative)', 'Explore: "Who does the therapist remind you of?"', 'Identify the pattern: "What are you expecting from them?"', 'Connect to early relationship templates', 'Use the therapeutic relationship to practice new patterns'] },
      { name: 'Defense Recognition', description: 'Identifying the unconscious strategies you use to avoid painful awareness: denial, projection, rationalization, reaction formation, etc.', steps: ['Notice when you feel sudden blankness, topic change, or emotional shift', 'Ask: "What might I be avoiding right now?"', 'Name the defense without judgment', 'Explore what lies beneath the defense', 'Gradually let the defense relax in the safety of the relationship'] },
      { name: 'Dream Analysis', description: 'Working with dreams as communications from the unconscious. Dreams use symbols and metaphors to express repressed wishes, fears, and conflicts.', steps: ['Record the dream immediately upon waking', 'Describe each element and your associations to it', 'Notice the emotional tone of the dream', 'Look for day residue (recent events) woven into deeper themes', 'Ask: "What is the dream trying to tell me?"'] }
    ],
    exercises: [
      {
        name: 'Relationship Pattern Inventory',
        description: 'Map your recurring relationship patterns to identify unconscious templates.',
        prompt: 'Think about your closest relationships (past and present):',
        fields: [
          { label: 'What role do you typically play in relationships? (caretaker, pleaser, rebel, etc.)', key: 'role' },
          { label: 'What do you most fear from others? (abandonment, rejection, engulfment, etc.)', key: 'fear' },
          { label: 'How is this similar to your childhood experience with your primary caregiver?', key: 'childhood' },
          { label: 'What pattern keeps repeating that you wish would stop?', key: 'pattern' },
          { label: 'What would a healthier version of this pattern look like?', key: 'healthy' }
        ]
      },
      {
        name: 'Defense Mechanism Awareness',
        description: 'Identify which defense mechanisms you use most frequently.',
        prompt: 'Which of these do you recognize in yourself? Rate each from 1 (rarely) to 5 (frequently):',
        fields: [
          { label: 'Denial — refusing to accept uncomfortable reality (1-5)', key: 'denial' },
          { label: 'Projection — attributing your feelings to others (1-5)', key: 'projection' },
          { label: 'Rationalization — explaining away uncomfortable truths (1-5)', key: 'rationalization' },
          { label: 'Displacement — redirecting emotions to safer targets (1-5)', key: 'displacement' },
          { label: 'Intellectualization — retreating into logic to avoid feeling (1-5)', key: 'intellectualization' },
          { label: 'Which defense is most active for you right now? What might it be protecting?', key: 'insight' }
        ]
      }
    ],
    whenToUse: ['Complex relational issues', 'Repeating destructive patterns', 'Personality disorders', 'Identity confusion', 'Chronic depression not responsive to CBT', 'Grief and loss', 'Childhood trauma (long-term processing)', 'Desire for deep self-understanding'],
    limitations: 'Long-term (months to years), expensive, and requires significant commitment. Less structured than CBT/DBT. Evidence base is harder to study due to treatment length and complexity. Can sometimes become an intellectual exercise rather than emotional transformation.',
    evidenceBase: 'Moderate-to-strong evidence. Meta-analyses show effectiveness comparable to CBT for depression and anxiety, with evidence of lasting change post-treatment. Short-term psychodynamic therapy (16-24 sessions) has strong evidence. Long-term psychodynamic therapy shows larger and more durable effects.',
    keyTexts: ['The Interpretation of Dreams — Sigmund Freud', 'Attachment in Psychotherapy — David Wallin', 'The Gift of Therapy — Irvin Yalom', 'The Examined Life — Stephen Grosz'],
    psycheMapLink: { framework: 'freud', layer: 0, note: 'Psychodynamic therapy works with the entire Freudian topology — making Id drives conscious, examining Ego defenses, and softening Superego rigidity.' }
  },
  {
    id: 'emdr',
    name: 'Eye Movement Desensitization & Reprocessing',
    shortName: 'EMDR',
    icon: '👁',
    color: '#4cbcd4',
    founder: 'Francine Shapiro (1987)',
    tradition: 'Western / Neuroscience-Based',
    corePremise: 'Traumatic memories get "stuck" in the brain in their original, unprocessed form — complete with the emotions, body sensations, and beliefs from the time of the event. Bilateral stimulation (eye movements, tapping, or sounds) helps the brain reprocess these stuck memories so they lose their emotional charge.',
    theory: {
      model: 'Adaptive Information Processing (AIP): The brain has a natural healing mechanism that processes experiences and integrates them into adaptive memory networks. Trauma disrupts this process, leaving memories "frozen" in their original disturbing state. EMDR restarts the natural healing process.',
      keyPrinciples: [
        'The brain naturally moves toward health when blocks are removed',
        'Traumatic memories are stored differently from normal memories',
        'Bilateral stimulation facilitates the brain\'s natural reprocessing',
        'The client does not need to describe the trauma in detail',
        'Insight emerges spontaneously during processing',
        'The body stores trauma and must be included in healing',
        'Past events, present triggers, and future challenges are all addressed'
      ]
    },
    techniques: [
      { name: 'The 8-Phase Protocol', description: 'EMDR follows a structured 8-phase approach from preparation through processing to integration.', steps: ['Phase 1: History and treatment planning', 'Phase 2: Preparation (safe place, grounding, coping skills)', 'Phase 3: Assessment (identify target memory, image, negative cognition, emotions, body sensation)', 'Phase 4: Desensitization (bilateral stimulation while holding the memory — the core processing phase)', 'Phase 5: Installation (strengthening a positive cognition)', 'Phase 6: Body Scan (checking for residual physical tension)', 'Phase 7: Closure (stabilization before ending session)', 'Phase 8: Re-evaluation (checking previous targets at next session)'] },
      { name: 'Safe Place / Container', description: 'A preparatory technique for creating internal safety and containing overwhelming material between sessions.', steps: ['Close your eyes and imagine a place where you feel completely safe', 'Engage all senses: What do you see? Hear? Smell? Feel?', 'Notice the positive feelings in your body', 'Give this place a cue word', 'Practice bilateral stimulation while holding this image', 'You can return to this safe place any time during or between sessions'] },
      { name: 'Butterfly Hug', description: 'A self-applied bilateral stimulation technique you can practice at home for self-soothing.', steps: ['Cross your arms over your chest, hands resting on upper arms', 'Close your eyes and bring to mind a calming image', 'Alternately tap your hands (left, right, left, right) at a steady pace', 'Continue for 1-2 minutes', 'Notice what happens to your emotional state', 'Can be used for self-soothing during stress'] }
    ],
    exercises: [
      {
        name: 'Disturbance Scan',
        description: 'Identify memories that may still carry unprocessed emotional charge.',
        prompt: 'Think about past events that still feel "charged" when you recall them:',
        fields: [
          { label: 'Briefly name the memory (no need for details)', key: 'memory' },
          { label: 'When you think of it, what emotion comes up? How intense? (0-10)', key: 'emotion' },
          { label: 'Where do you feel it in your body?', key: 'body' },
          { label: 'What negative belief about yourself goes with this memory? (e.g., "I\'m not safe", "I\'m powerless")', key: 'belief' },
          { label: 'What would you prefer to believe about yourself? (e.g., "I survived", "I have choices now")', key: 'positive' }
        ]
      }
    ],
    whenToUse: ['PTSD and complex PTSD', 'Single-incident trauma (accidents, assaults)', 'Childhood trauma', 'Phobias', 'Grief', 'Performance anxiety', 'Chronic pain with trauma history', 'Disturbing memories that feel "stuck"'],
    limitations: 'Requires a trained EMDR therapist — not a self-help technique. Can be destabilizing for people without adequate coping resources. Controversial in some circles (debate about whether eye movements are the active ingredient or the exposure component). Not suitable for active psychosis or severe dissociation without extensive preparation.',
    evidenceBase: 'Strong evidence for PTSD — recognized as effective treatment by WHO, APA, VA/DoD, and NICE. Comparable effectiveness to trauma-focused CBT for PTSD with faster treatment times (typically 6-12 sessions). Growing evidence for depression, anxiety, pain, and phobias.',
    keyTexts: ['Getting Past Your Past — Francine Shapiro', 'The Body Keeps the Score — Bessel van der Kolk (includes EMDR)', 'EMDR: The Breakthrough Therapy — Francine Shapiro'],
    psycheMapLink: { framework: 'functional', layer: 0, note: 'EMDR works at the System 1 / limbic level — reprocessing implicit memories stored in the brain\'s fear circuitry.' }
  },
  {
    id: 'ifs',
    name: 'Internal Family Systems',
    shortName: 'IFS',
    icon: '🔮',
    color: '#e8836b',
    founder: 'Richard Schwartz (1980s)',
    tradition: 'Western / Systems Theory',
    corePremise: 'The mind is naturally multiple — we all have sub-personalities or "parts." These parts have good intentions but can take on extreme roles (protectors, exiles) due to trauma or life experiences. Beneath all parts is the Self — a naturally wise, calm, curious, compassionate center that can heal from within.',
    theory: {
      model: 'Three types of parts orbit around the core Self: Managers (prevent pain proactively), Firefighters (react when pain breaks through), and Exiles (hold the pain, often locked away). Healing happens when Self leads and all parts feel safe enough to release their extreme roles.',
      keyPrinciples: [
        'Everyone has a core Self that is inherently whole, calm, curious, and compassionate',
        'All parts have positive intentions, even the destructive ones',
        'Parts take on extreme roles as adaptations to trauma or adversity',
        'Healing happens when Self (not another part) leads the internal system',
        'You don\'t get rid of parts — you help them unburden and find new roles',
        'The eight Cs of Self: Calm, Clarity, Curiosity, Compassion, Confidence, Courage, Creativity, Connectedness'
      ],
      partTypes: [
        { name: 'Managers', description: 'Proactive protectors that try to prevent painful feelings from surfacing. They control, plan, criticize, people-please, or intellectualize to keep vulnerable parts locked away. They run your daily life.', examples: ['Inner Critic', 'People Pleaser', 'Perfectionist', 'Controller', 'Caretaker', 'Workaholic'] },
        { name: 'Firefighters', description: 'Reactive protectors that jump in when exiled pain breaks through. They use extreme measures to numb, distract, or dissociate from overwhelming emotions. Their methods are often destructive.', examples: ['Addiction', 'Rage', 'Binge eating', 'Self-harm', 'Dissociation', 'Suicidal ideation', 'Compulsive behavior'] },
        { name: 'Exiles', description: 'Vulnerable parts that carry the pain, shame, fear, and wounds from the past. They are locked away by protectors because their pain is seen as too overwhelming. They often appear as younger versions of yourself.', examples: ['The wounded child', 'The shamed one', 'The abandoned one', 'The terrified one', 'The one who believes they are unlovable'] }
      ]
    },
    techniques: [
      { name: 'Parts Mapping', description: 'Identifying and mapping your internal parts — their roles, relationships, and what they protect.', steps: ['Close your eyes and notice what parts are active right now', 'Ask: "Who\'s there?" and notice what shows up', 'For each part: give it a name or description', 'Notice where you feel it in your body', 'Notice its emotional quality', 'Ask: "What is this part\'s job? What does it protect me from?"', 'Map the relationships between parts'] },
      { name: 'Speaking TO Parts vs. FROM Parts', description: 'The crucial distinction: speaking FROM a part means you are blended with it (you ARE angry). Speaking TO a part means Self is present and can relate to the part with curiosity and compassion.', steps: ['Notice you are activated (blended with a part)', 'Ask the part to "step back" or "unblend" just a little', 'If you can feel curious about the part rather than IS the part, Self is present', 'Ask the part: "What do you want me to know?"', 'Listen with genuine curiosity (Self quality)', '"How old do you think I am?" — often parts think you are still a child'] },
      { name: 'Unburdening', description: 'The transformative process where an exile releases the pain it has been carrying (the "burden") and takes on new qualities.', steps: ['Build trust with protective parts first (they need to know it\'s safe)', 'Approach the exile slowly, with Self in the lead', 'Witness the exile\'s story — what happened to it', 'Offer the exile what it needed then (nurturing, protection, validation)', 'Ask: "Are you ready to let go of this burden?"', 'If yes: visualize releasing it (to wind, water, fire, earth, light)', 'Ask what qualities it wants to fill the space (often: lightness, playfulness, freedom)'] }
    ],
    exercises: [
      {
        name: 'Parts Check-In',
        description: 'A daily practice for building awareness of your internal system.',
        prompt: 'Take a moment to notice who is "active" in your internal system right now:',
        fields: [
          { label: 'What part is loudest right now? What is it saying/feeling?', key: 'loudest' },
          { label: 'What does this part want you to do? (Its action urge)', key: 'urge' },
          { label: 'Where do you feel this part in your body?', key: 'body' },
          { label: 'What is this part trying to protect you from?', key: 'protecting' },
          { label: 'Can you feel curious and compassionate toward it? (This indicates Self-energy)', key: 'self_energy' }
        ]
      },
      {
        name: 'Protector Appreciation',
        description: 'Acknowledge and thank a protective part for its hard work.',
        prompt: 'Identify a protector part (critic, controller, worrier, etc.) and dialogue with it:',
        fields: [
          { label: 'Name or describe the protector:', key: 'protector' },
          { label: 'How long has this part been doing its job?', key: 'how_long' },
          { label: 'What is it afraid would happen if it stopped?', key: 'fear' },
          { label: 'Write a message of genuine appreciation: "Thank you for..."', key: 'thanks' },
          { label: 'What might this part want to do instead if it felt safe enough?', key: 'new_role' }
        ]
      }
    ],
    whenToUse: ['Complex trauma / C-PTSD', 'Inner critic / self-sabotage patterns', 'Addiction and compulsive behavior', 'Dissociation', 'Conflicting inner motivations ("part of me wants X, part of me wants Y")', 'Eating disorders', 'Shame-based issues', 'Difficulty accessing emotions'],
    limitations: 'Requires a therapist skilled in IFS for deep trauma work. Can be destabilizing if exiles surface too quickly without adequate protector work. The model\'s spiritual/mystical aspects (Self as inherently wise) may not suit everyone. Research base is growing but still smaller than CBT.',
    evidenceBase: 'Designated as evidence-based by NREPP (National Registry of Evidence-based Programs). Growing RCT evidence for PTSD, depression, phobias, and chronic pain. A 2021 RCT demonstrated large effects for PTSD. The model is increasingly used in trauma centers worldwide.',
    keyTexts: ['No Bad Parts — Richard Schwartz', 'Internal Family Systems Therapy — Richard Schwartz', 'You Are the One You\'ve Been Waiting For — Richard Schwartz', 'Self-Therapy — Jay Earley'],
    psycheMapLink: { framework: 'jungian', layer: 3, note: 'IFS maps directly onto Jungian depth — protectors are like the Persona, exiles are the Shadow, and Self resonates with Jung\'s Self archetype.' }
  },
  {
    id: 'gestalt',
    name: 'Gestalt Therapy',
    shortName: 'Gestalt',
    icon: '🪑',
    color: '#d4544c',
    founder: 'Fritz Perls, Laura Perls, Paul Goodman (1950s)',
    tradition: 'Western / Existential-Humanistic',
    corePremise: 'Awareness itself is healing. The goal is not to analyze the past but to bring full awareness to the present moment — what you are feeling, sensing, and doing RIGHT NOW. Unfinished business from the past intrudes into the present as interruptions to contact.',
    theory: {
      model: 'The organism naturally moves toward wholeness (gestalt = whole form). Neurosis is an interruption in the natural cycle of need-awareness-action-contact-satisfaction. By restoring awareness to the point of interruption, natural organismic self-regulation resumes.',
      keyPrinciples: [
        'Here and now: the only reality is the present moment',
        'Awareness is curative — what you become fully aware of changes naturally',
        'The body is primary: feelings live in the body before the mind',
        'Contact: health is full contact with self, others, and environment',
        'Unfinished business creates interruptions to contact',
        'I-Thou relationship (Martin Buber): authentic meeting between therapist and client',
        'Responsibility: "I am responsible for my experience"'
      ]
    },
    techniques: [
      { name: 'Empty Chair Dialogue', description: 'Speaking to a person, part of yourself, or feeling placed in an empty chair. Then switching seats and becoming that other, responding back. Creates direct, experiential contact with what was avoided.', steps: ['Place an empty chair facing you', 'Imagine the person (or part of you) sitting there', 'Speak directly to them — say what you have never said', 'Switch chairs: become the other and respond', 'Continue the dialogue, switching as needed', 'Notice what shifts in your body and emotions', 'Find what you need to say to complete the unfinished business'] },
      { name: 'Body Awareness', description: 'Continuously tracking physical sensations as a guide to emotional experience. "Where do you feel that in your body RIGHT NOW?"', steps: ['Notice your posture, breathing, and tension', 'When you make a statement, check: what do you feel physically?', 'If a feeling seems unclear: "Stay with that sensation. What does it want to do?"', 'Follow the body\'s subtle movements and impulses', 'Let the body express what words cannot'] },
      { name: 'The Experiment', description: 'Instead of talking about experience, creating a live experiment in the session. "Don\'t tell me about your anger — show me. Let yourself be angry right now."', steps: ['Identify the avoided experience', 'Design a live experiment to bring it into the room', '"Try saying that sentence to this chair"', '"Exaggerate that gesture — make it bigger"', '"Stay with that feeling and let it grow"', 'Process what emerged through the experiment'] },
      { name: 'Exaggeration', description: 'When a client makes an unconscious gesture or uses a particular tone, asking them to exaggerate it until its meaning emerges.', steps: ['Notice a gesture, posture, or vocal quality', '"Do that again" or "Make that bigger"', 'Repeat and amplify until the full expression emerges', 'Often leads to suppressed emotions or messages', '"What does your hand want to do? Let it."'] }
    ],
    exercises: [
      {
        name: 'Present Moment Awareness',
        description: 'Practice the Gestalt "awareness continuum" — simply tracking your moment-to-moment experience.',
        prompt: 'For 3 minutes, complete these sentences out loud or in writing, noticing what changes:',
        fields: [
          { label: 'Right now I am aware of... (external sensations — what I see, hear, feel)', key: 'outer' },
          { label: 'Right now I am aware of... (inner sensations — body feelings, emotions)', key: 'inner' },
          { label: 'Right now I am aware of... (thoughts, fantasies, judgments)', key: 'thoughts' },
          { label: 'What do I notice about what I tend to avoid or skip over?', key: 'avoidance' },
          { label: 'What is the most alive thing in my experience right now?', key: 'alive' }
        ]
      },
      {
        name: 'Unfinished Business Letter',
        description: 'Write a letter to someone with whom you have unfinished emotional business. Don\'t send it.',
        prompt: 'Choose someone (living or dead) to whom you have something left unsaid:',
        fields: [
          { label: 'Who are you writing to?', key: 'who' },
          { label: 'What have you never said to this person? (Let it out fully, uncensored)', key: 'unsaid' },
          { label: 'What did you need from them that you did not receive?', key: 'need' },
          { label: 'How do you feel right now, having written this?', key: 'feeling' }
        ]
      }
    ],
    whenToUse: ['Emotional avoidance / numbness', 'Difficulty expressing feelings', 'Grief and loss (unfinished business)', 'Relationship conflicts', 'Identity exploration', 'Creativity blocks', 'People who over-intellectualize', 'Body-based issues'],
    limitations: 'Can feel confrontational if not done skillfully. Less structured than CBT/DBT. The emphasis on emotional expression may not suit all cultures. Evidence base is smaller than more structured therapies. Requires a highly skilled therapist to navigate intense emotional territory safely.',
    evidenceBase: 'Moderate evidence. Growing RCT evidence for depression, anxiety, and process-based interventions. Several meta-analyses show effectiveness comparable to other approaches. Emotion-Focused Therapy (EFT), which evolved from Gestalt, has a stronger research base.',
    keyTexts: ['Gestalt Therapy — Perls, Hefferline & Goodman', 'In and Out the Garbage Pail — Fritz Perls', 'Gestalt Therapy Integrated — Polster & Polster'],
    psycheMapLink: { framework: 'jungian', layer: 1, note: 'Gestalt works at the Ego level but pushes constantly to expand consciousness beyond its comfortable boundaries into full organismic awareness.' }
  },
  {
    id: 'somatic',
    name: 'Somatic Experiencing',
    shortName: 'Somatic',
    icon: '🫁',
    color: '#4cd49a',
    founder: 'Peter Levine (1970s)',
    tradition: 'Western / Body-Based',
    corePremise: 'Trauma lives in the body, not just the mind. Animals in the wild discharge traumatic energy naturally (shaking, trembling after a threat). Humans suppress this discharge, and the survival energy gets "frozen" in the nervous system. SE helps complete the interrupted biological response, releasing the stored trauma from the body.',
    theory: {
      model: 'The nervous system has three states: Social Engagement (ventral vagal — safe, connected), Fight/Flight (sympathetic — mobilized), and Freeze/Collapse (dorsal vagal — immobilized). Trauma occurs when the body gets stuck in fight/flight/freeze and cannot return to safety. SE titrates the discharge of this stuck energy.',
      keyPrinciples: [
        'Trauma is in the BODY, not the event — it is a nervous system response',
        'Animals naturally discharge survival energy; humans learn to suppress it',
        'The "trauma vortex" (overwhelm) and "healing vortex" (resources) must be pendulated',
        'Titration: small doses of activation, not flooding — the body cannot be rushed',
        'Completion: the body needs to finish what it started (the thwarted fight or flight)',
        'The body\'s wisdom guides the process — follow sensation, not story'
      ]
    },
    techniques: [
      { name: 'Pendulation', description: 'Gently moving awareness between areas of activation (discomfort) and areas of resource (comfort/safety/strength) in the body. This teaches the nervous system that it can move through activation and return to regulation.', steps: ['Notice where you feel activation/stress in your body', 'Stay with it briefly, then...', 'Shift attention to a part of your body that feels neutral or good', 'Stay with the resource for a moment', 'Gently move back to the activation area', 'Notice if anything has shifted', 'Continue this pendulation rhythm', 'The nervous system learns: "I can feel this AND come back to safety"'] },
      { name: 'Titration', description: 'Approaching traumatic material in very small, manageable doses — like slowly diluting a strong solution. The opposite of cathartic flooding.', steps: ['Touch the edge of the activation gently, never diving in', 'Stay at the edge for only seconds', 'Track body sensations (not the story)', 'Notice micro-movements: trembling, heat, twitching', 'Allow these natural discharge responses', 'Return to resource/grounding', 'The body completes its healing in layers'] },
      { name: 'Resourcing', description: 'Building a felt sense of internal and external resources — safety, strength, connection — that can anchors you during processing.', steps: ['Think of a person, place, or activity that gives you a sense of safety', 'Notice where you feel that safety in your body', 'Amplify the positive sensations', 'Add to your resource inventory: strength, comfort, protection, connection', 'Practice accessing these resources regularly', 'In session: return to resources when activation increases'] },
      { name: 'Grounding', description: 'Establishing connection with the physical body and environment to anchor in the present moment. Essential for trauma processing.', steps: ['Feel your feet on the floor — press down and notice the support', 'Feel the chair/surface supporting your body', 'Notice 5 things you can see, 4 you can hear, 3 you can touch', 'Slowly press your hands together and feel the pressure', 'Take a slow breath and feel the ground beneath you', 'Say to yourself: "I am here. I am safe. It is [current date]."'] }
    ],
    exercises: [
      {
        name: 'Body Scan for Activation',
        description: 'Map your current nervous system state by scanning for areas of activation and resource.',
        prompt: 'Slowly scan through your body and notice:',
        fields: [
          { label: 'Where do you feel tension, tightness, or discomfort? Describe the sensation.', key: 'activation' },
          { label: 'Where do you feel comfort, warmth, or relaxation?', key: 'resource' },
          { label: 'What is your overall nervous system state? (Calm / Alert / Activated / Frozen / Numb)', key: 'state' },
          { label: 'If the activated area could speak, what would it say?', key: 'message' },
          { label: 'After noticing both areas, what do you notice happening in your body right now?', key: 'shift' }
        ]
      },
      {
        name: 'Shaking / Discharge Practice',
        description: 'A brief practice to release stored survival energy through natural movement.',
        prompt: 'Stand in a comfortable space and try this gentle discharge practice:',
        fields: [
          { label: 'Gently bounce on your feet, letting your body shake loosely for 2 minutes. What do you notice?', key: 'shaking' },
          { label: 'After stopping, stand still and feel. What sensations are present?', key: 'after' },
          { label: 'Take 3 slow breaths. What is different from before you started?', key: 'difference' }
        ]
      }
    ],
    whenToUse: ['PTSD and complex trauma', 'Accident survivors', 'Physical assault survivors', 'Chronic pain and illnesses with trauma history', 'Dissociation', 'Panic attacks', 'Phobias', 'Developmental trauma where talk therapy feels insufficient'],
    limitations: 'Requires a trained SE practitioner for trauma processing (not a self-help technique for severe trauma). Can bring up intense body sensations that need professional support. Less structured than CBT — progress can be harder to measure. Research base is growing but still smaller than traditional trauma therapies.',
    evidenceBase: 'Emerging but growing evidence. A 2017 RCT showed significant reduction in PTSD symptoms. Several smaller studies support effectiveness for PTSD, chronic pain, and physical health outcomes. Aligns with polyvagal theory and neuroscience of trauma. Often used in conjunction with other therapies.',
    keyTexts: ['Waking the Tiger — Peter Levine', 'In an Unspoken Voice — Peter Levine', 'The Body Keeps the Score — Bessel van der Kolk', 'Healing Trauma — Peter Levine'],
    psycheMapLink: { framework: 'functional', layer: 0, note: 'Somatic Experiencing works directly at the Reptilian Brain / System 1 level — the preverbal, body-based survival system.' }
  }
];

// ── THERAPY CROSS-REFERENCES ──
window.PsycheData.therapyComparisons = {
  dimensions: ['Focus', 'Timeframe', 'Structure', 'Client Role', 'Therapist Role', 'Key Mechanism'],
  comparisons: [
    { therapy: 'CBT', focus: 'Thoughts & beliefs', timeframe: '12-20 sessions', structure: 'Highly structured', clientRole: 'Active participant / student', therapistRole: 'Teacher / Socratic guide', mechanism: 'Cognitive restructuring' },
    { therapy: 'DBT', focus: 'Emotional regulation', timeframe: '6-12 months', structure: 'Structured + flexible', clientRole: 'Skill learner', therapistRole: 'Coach + validator', mechanism: 'Dialectical acceptance + behavior change' },
    { therapy: 'ACT', focus: 'Values & flexibility', timeframe: '8-16 sessions', structure: 'Moderate', clientRole: 'Values explorer', therapistRole: 'Companion / guide', mechanism: 'Defusion + committed action' },
    { therapy: 'Psychodynamic', focus: 'Unconscious patterns', timeframe: 'Months to years', structure: 'Unstructured', clientRole: 'Explorer of inner world', therapistRole: 'Relational mirror', mechanism: 'Insight + corrective emotional experience' },
    { therapy: 'EMDR', focus: 'Traumatic memories', timeframe: '6-12 sessions', structure: 'Highly structured', clientRole: 'Observer of internal process', therapistRole: 'Process facilitator', mechanism: 'Bilateral reprocessing' },
    { therapy: 'IFS', focus: 'Internal parts system', timeframe: 'Variable', structure: 'Moderate', clientRole: 'Self-leader', therapistRole: 'Parts guide', mechanism: 'Self-leadership + unburdening' },
    { therapy: 'Gestalt', focus: 'Present experience', timeframe: 'Variable', structure: 'Unstructured', clientRole: 'Experiencer', therapistRole: 'Awareness facilitator', mechanism: 'Awareness + contact' },
    { therapy: 'Somatic', focus: 'Body/nervous system', timeframe: 'Variable', structure: 'Moderate', clientRole: 'Body listener', therapistRole: 'Nervous system guide', mechanism: 'Titrated discharge' }
  ]
};

// ── SYMPTOM-TO-THERAPY MATCHER ──
window.PsycheData.therapyMatcher = [
  { symptom: 'Recurring negative thoughts / overthinking', primary: ['cbt', 'act'], secondary: ['dbt'] },
  { symptom: 'Intense emotional swings / emotional flooding', primary: ['dbt'], secondary: ['ifs', 'somatic'] },
  { symptom: 'Flashbacks / nightmares / feeling "stuck" in the past', primary: ['emdr', 'somatic'], secondary: ['ifs', 'psychodynamic'] },
  { symptom: 'Self-harm or suicidal thoughts', primary: ['dbt'], secondary: ['ifs', 'cbt'] },
  { symptom: 'Repeating relationship patterns', primary: ['psychodynamic', 'ifs'], secondary: ['gestalt'] },
  { symptom: 'Feeling disconnected from body / numbness', primary: ['somatic', 'gestalt'], secondary: ['ifs', 'dbt'] },
  { symptom: 'Inner critic / perfectionism / self-sabotage', primary: ['ifs', 'cbt'], secondary: ['act', 'gestalt'] },
  { symptom: 'Feeling "stuck" or unmotivated / values confusion', primary: ['act'], secondary: ['psychodynamic', 'gestalt'] },
  { symptom: 'Grief / loss / unfinished emotional business', primary: ['gestalt', 'psychodynamic'], secondary: ['emdr', 'ifs'] },
  { symptom: 'Panic attacks / phobias / specific fears', primary: ['cbt', 'emdr'], secondary: ['somatic', 'dbt'] },
  { symptom: 'Addiction / compulsive behaviors', primary: ['dbt', 'ifs'], secondary: ['act', 'psychodynamic'] },
  { symptom: 'Chronic pain or physical symptoms without medical cause', primary: ['somatic'], secondary: ['act', 'cbt'] },
  { symptom: 'Difficulty trusting / attachment issues', primary: ['psychodynamic', 'ifs'], secondary: ['dbt', 'gestalt'] },
  { symptom: 'Low self-esteem / shame', primary: ['ifs', 'cbt'], secondary: ['psychodynamic', 'act'] },
  { symptom: 'Existential crisis / loss of meaning', primary: ['act', 'psychodynamic'], secondary: ['gestalt'] }
];
