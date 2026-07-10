export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }

export type Note = {
  slug: string
  title: string
  summary: string
  date: string
  readingTime: string
  tags: string[]
  blocks: NoteBlock[]
}

export const notes: Note[] = [
  {
    slug: "act-vs-diffusion-policy",
    title: "ACT vs Diffusion Policy: what actually matters with 50 demos",
    summary:
      "Both are 'imitation learning', but they fail differently. Notes from training both on the same leader–follower LeRobot setup — data quality, chunk sizes, and when each one wins.",
    date: "2026-03-10",
    readingTime: "6 min",
    tags: ["Imitation Learning", "ACT", "Diffusion Policy", "LeRobot"],
    blocks: [
      {
        type: "p",
        text: "After collecting demonstration datasets on a leader–follower rig and training both ACT and Diffusion Policy on the same tasks, the practical differences are much sharper than the papers suggest. Here's what actually moved success rates.",
      },
      { type: "h2", text: "Where ACT shines" },
      {
        type: "ul",
        items: [
          "Action chunking is the whole trick: predicting 50–100 steps at once smooths out compounding errors that kill single-step behavior cloning.",
          "Training is fast and stable — a usable policy in a couple of hours on one GPU, which matters when you're iterating on task setup daily.",
          "Temporal ensembling at inference gives you smooth trajectories almost for free.",
          "For quasi-static tasks (pick, place, insert), ACT with clean demos is very hard to beat.",
        ],
      },
      { type: "h2", text: "Where Diffusion Policy earns its cost" },
      {
        type: "ul",
        items: [
          "Multimodal demonstrations: when demonstrators approached the object from different sides, ACT averaged the modes into a mush; diffusion committed to one and executed it.",
          "It degrades more gracefully with messy, heterogeneous demo sets.",
          "The price: slower training, slower inference (denoising steps), and more sensitivity to normalization details.",
        ],
      },
      { type: "h2", text: "What mattered more than the architecture" },
      {
        type: "ul",
        items: [
          "Demo quality beat demo quantity every single time. Ten deliberate, consistent demonstrations outperformed fifty rushed ones.",
          "Camera placement is part of the policy. Moving the wrist camera changed success rates more than any hyperparameter.",
          "Record demos at the speed you want the robot to move. Policies imitate your hesitation too.",
          "Fix the seed, version the dataset, and log everything — 'it worked yesterday' is a data problem, not a training problem.",
        ],
      },
    ],
  },
  {
    slug: "foc-over-canopen-lessons",
    title: "Closed-loop FOC over CANopen: lessons from a pipe-crawling robot",
    summary:
      "Getting a Maxon EC 90 Flat to hold position inside a pipeline taught me more about motor control than any course — EPOS4 tuning, CANopen state machines, and why distributed beats centralized.",
    date: "2025-08-22",
    readingTime: "7 min",
    tags: ["FOC", "CANopen", "EPOS4", "Motor Control", "Embedded"],
    blocks: [
      {
        type: "p",
        text: "The pipe-crawling inspection robot (now patent-filed) lives or dies on one thing: can the drive motor hold and track position precisely while the grippers cycle? Field-oriented control of a Maxon EC 90 Flat through an EPOS4 over CANopen got us there, but the road had lessons.",
      },
      { type: "h2", text: "CANopen is a state machine, respect it" },
      {
        type: "ul",
        items: [
          "The NMT and drive state machines (Switch On Disabled → Ready → Switched On → Operation Enabled) must be walked in order — most 'random faults' were us violating transitions.",
          "PDO mapping is where the real-time behavior lives. SDOs are for configuration; if position targets go over SDO, you've already lost.",
          "Heartbeat + emergency objects are not optional extras. Detecting a dropped node fast is the difference between a stall and a stuck robot in a pipe.",
        ],
      },
      { type: "h2", text: "Tuning FOC for a robot that grips" },
      {
        type: "ul",
        items: [
          "Auto-tune gives you a starting point for a free shaft — not for a robot pressing against a pipe wall. Load changes the plant; retune under realistic load.",
          "Encoder-synchronized position tracking across actuation phases mattered more than raw bandwidth: coordination, not speed, is what makes leech-like locomotion stable.",
          "Current limits are your compliance layer. We shaped grip force with torque limits before touching any mechanical redesign.",
        ],
      },
      { type: "h2", text: "Distribute the control system" },
      {
        type: "ul",
        items: [
          "Microcontrollers per subsystem + Raspberry Pi as coordinator (over I2C) isolated faults: a gripper MCU lockup no longer took down drive control.",
          "Modularity paid off in the patent too — the distributed architecture is part of what makes the design scalable to different pipe diameters.",
          "Keep vision (YOLOv8 defect detection) off the control path entirely. Perception informs; the control loop never waits for it.",
        ],
      },
    ],
  },
  {
    slug: "llm-agents-that-grade-code",
    title: "LLM agents that grade robot code: close the loop or don't bother",
    summary:
      "Building a LangGraph multi-agent pipeline that generates ROS2 assessments taught one hard rule — an LLM's opinion of code is worthless next to executing it in a sandbox.",
    date: "2026-05-30",
    readingTime: "6 min",
    tags: ["LangGraph", "LLM Agents", "ROS2", "Docker"],
    blocks: [
      {
        type: "p",
        text: "The agentic assessment system generates ROS2 coding questions with multiple LLMs — authors, critics, a supervisor. The single biggest quality jump didn't come from better prompts or bigger models. It came from refusing to ship anything that hadn't executed.",
      },
      { type: "h2", text: "The architecture that survived contact with reality" },
      {
        type: "ul",
        items: [
          "Reflexion-style loops: author drafts, critics score against an explicit quality bar, supervisor regenerates failures. Bounded rounds — no infinite self-improvement fantasies.",
          "Executable grading: every reference solution runs in an ephemeral ROS2 Docker sandbox. If it doesn't build and pass its own checks, the question never existed.",
          "Vector-embedding originality checks against the existing question bank — LLMs love to quietly repeat themselves.",
          "SQLite checkpointing so a 100-question batch that dies at question 73 resumes at 73, not zero.",
        ],
      },
      { type: "h2", text: "Things I'd tell past me" },
      {
        type: "ul",
        items: [
          "Critics need rubrics, not vibes. 'Rate this question 1–10' produces noise; 'does the starter code compile without the fix' produces signal.",
          "Multi-model beats single-model, but for boring reasons: different models fail differently, so cross-checking catches more than self-review does.",
          "Cost discipline is architecture: track tokens per question, batch the critics, and route easy checks to cheap models.",
          "Determinism is a feature. Everything the pipeline accepts is code-verified; the LLM is never the last line of defense.",
        ],
      },
    ],
  },
  {
    slug: "formula-student-to-f1tenth",
    title: "From Formula Student to F1TENTH: racing is a systems discipline",
    summary:
      "I led a Formula Student powertrain team before I wrote my first ROS node. Deploying Autoware on a 1/10-scale racer felt oddly familiar — the grid teaches you things simulation can't.",
    date: "2025-12-05",
    readingTime: "5 min",
    tags: ["F1TENTH", "Autoware", "Formula Student", "Racing"],
    blocks: [
      {
        type: "p",
        text: "Before robotics, there was Team Force Racing — Formula Bharat, karting series, KTM 390 wiring harnesses at 2 AM. When I later deployed Autoware on an F1TENTH platform, the surprise was how much transferred. Racing, human or autonomous, is a systems discipline wearing a sport's clothes.",
      },
      { type: "h2", text: "What the powertrain years taught" },
      {
        type: "ul",
        items: [
          "Budgets and deadlines are constraints exactly like torque curves — you design within all of them simultaneously.",
          "Integration is where projects die. The intake that works on the dyno and the loom that works on the bench still have to work together in the car, on race day.",
          "Test at increasing intensity, never all-out first. We shook down karts the way I now shake down autonomy stacks: slow laps, then faster.",
        ],
      },
      { type: "h2", text: "What carried into F1TENTH + Autoware" },
      {
        type: "ul",
        items: [
          "A 1/10-scale car at speed is unforgiving the same way a real one is — tuning planning and control for small-scale dynamics is race engineering with different units.",
          "Obstacle avoidance at pace is a trust exercise between perception latency and control authority; margins are engineered, not hoped for.",
          "The pit-wall mindset: telemetry first. If you can't see what the stack decided and why, you're not racing, you're gambling.",
        ],
      },
    ],
  },
]
