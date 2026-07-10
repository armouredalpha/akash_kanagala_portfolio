export const siteConfig = {
  name: "Akash Kanagala",
  initials: "AK",
  tagline: "Robotics Engineer · ROS2 Navigation & Manipulation · Imitation Learning · Agentic AI",
  description:
    "Robotics Engineer with ~2 years across perception, control, and learning — ROS2 navigation and manipulation, imitation learning (ACT, Diffusion Policy), and LLM-driven agentic pipelines. Hands-on from closed-loop motor control to autonomous robotics.",
  email: "kanagalaakash11@gmail.com",
  phone: "+91-7981313853",
  github: "https://github.com/armouredalpha",
  linkedin: "https://www.linkedin.com/in/akash-kanagala",
  twitter: "#",
}

export type CaseStudy = {
  problem: string
  approach: string
  highlights: string[]
  stack: { label: string; value: string }[]
  outcome: string
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: "Robotics" | "AI/ML" | "Control Systems" | "Agentic AI"
  year: string
  cover: string
  featured: boolean
  repo?: string
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: "agentic-ros2-assessment",
    title: "Agentic Multi-LLM Assessment System",
    subtitle: "LangGraph multi-agent pipeline that writes, validates, and grades ROS2 assessments",
    description:
      "A LangGraph-based multi-agent pipeline for automated ROS2 assessment generation — Reflexion-style generate–validate–regenerate loops, executable grading in ephemeral ROS2 Docker sandboxes, vector-embedding originality checks, and SQLite-checkpointed resumable execution.",
    tags: ["LangGraph", "Multi-Agent", "ROS2", "Docker", "Vector Embeddings", "SQLite"],
    category: "Agentic AI",
    year: "2026",
    cover: "/projects/agentic-assessment/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Generating ROS2 coding assessments at scale needs more than an LLM with a good prompt: questions must compile, run, grade deterministically, and never repeat each other. A single-shot model can't guarantee any of that.",
      approach:
        "Architected a LangGraph multi-agent pipeline with a Reflexion-style loop: author agents draft questions, critic agents validate them against a quality bar, and a supervisor regenerates anything that fails. Every question's reference solution executes inside an ephemeral ROS2 Docker sandbox before release, and vector-embedding similarity checks reject near-duplicates. SQLite checkpointing makes long batch runs fully resumable.",
      highlights: [
        "Generate–validate–regenerate loop: no question ships until critics and the quality bar pass it",
        "Executable grading in throwaway ROS2 Docker sandboxes — every question is code-verified before release",
        "Vector-embedding originality checks keep the question bank free of near-duplicates",
        "SQLite-checkpointed execution: a crashed batch resumes exactly where it stopped",
      ],
      stack: [
        { label: "Agents", value: "LangGraph, multi-LLM routing" },
        { label: "Execution", value: "Ephemeral ROS2 Docker sandboxes" },
        { label: "Storage", value: "SQLite checkpoints, vector store" },
        { label: "Languages", value: "Python, Pydantic" },
      ],
      outcome:
        "A production pipeline where every generated question is code-verified before release — assessment generation that runs unattended and survives failures mid-batch.",
    },
  },
  {
    slug: "f1tenth-autoware",
    title: "F1TENTH × Autoware",
    subtitle: "Full autonomy stack on a 1/10-scale race platform",
    description:
      "Deployed the Autoware stack on an F1TENTH platform — obstacle avoidance and end-to-end navigation using Autoware's planning and control modules on real racing hardware.",
    tags: ["Autoware", "F1TENTH", "ROS2", "Planning", "Control", "Autonomous Racing"],
    category: "Robotics",
    year: "2025",
    cover: "/projects/f1tenth/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Autoware is built for full-size autonomous vehicles; an F1TENTH car is a fast, twitchy 1/10-scale platform. Getting the industrial stack to drive the small car — reliably, around obstacles — is an integration and tuning problem end to end.",
      approach:
        "Brought up the complete Autoware pipeline on the F1TENTH platform: localization, perception, and the planning/control modules retuned for small-scale dynamics. Implemented obstacle avoidance and end-to-end navigation, validating behavior at increasing speeds on the real car.",
      highlights: [
        "Full Autoware bring-up on embedded compute — not a simulation demo",
        "Planning and control modules retuned for 1/10-scale vehicle dynamics",
        "Obstacle avoidance validated on hardware at speed",
        "End-to-end: sensor drivers to actuation, one launch",
      ],
      stack: [
        { label: "Autonomy", value: "Autoware, ROS2" },
        { label: "Platform", value: "F1TENTH 1/10-scale racer" },
        { label: "Modules", value: "Planning, control, obstacle avoidance" },
        { label: "Languages", value: "Python, C++" },
      ],
      outcome:
        "A working small-scale autonomous racer running the same stack as full-size AVs — proof the industrial toolchain scales down when you understand every layer of it.",
    },
  },
  {
    slug: "multi-robot-fleet",
    title: "Multi-Robot Fleet Control",
    subtitle: "Coordinated multi-action behaviors across four robot morphologies",
    description:
      "Integrated and extended control frameworks to orchestrate coordinated behaviors — obstacle traversal, traffic-signal recognition, line following — across humanoid, PuppyPi quadruped, hexapod, and JetAuto platforms, with a custom control UI for seamless multi-action execution.",
    tags: ["Fleet Control", "Humanoid", "Quadruped", "Hexapod", "JetAuto", "Control UI"],
    category: "Robotics",
    year: "2025",
    cover: "/projects/fleet/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Each robot morphology ships with its own vendor framework and quirks. Running coordinated multi-robot behaviors — and letting an operator drive them without juggling four codebases — needs a unifying control layer.",
      approach:
        "Integrated and extended the control frameworks of humanoid, PuppyPi quadruped, hexapod, and JetAuto platforms into a coordinated behavior system covering obstacle traversal, traffic-signal recognition, and line following. Built a custom control UI on top so multi-action sequences execute across the fleet from one place.",
      highlights: [
        "One control layer across four very different morphologies — legged, wheeled, humanoid",
        "Coordinated behaviors: obstacle traversal, traffic-signal recognition, line following",
        "Custom operator UI for sequencing multi-action executions",
        "Vendor frameworks extended, not replaced — kept upgrade paths intact",
      ],
      stack: [
        { label: "Platforms", value: "Humanoid, PuppyPi, hexapod, JetAuto" },
        { label: "Behaviors", value: "Traversal, signal recognition, line following" },
        { label: "Interface", value: "Custom multi-robot control UI" },
        { label: "Languages", value: "Python" },
      ],
      outcome:
        "A demo-ready heterogeneous fleet driven from a single UI — coordinated multi-robot behavior without per-platform babysitting.",
    },
  },
  {
    slug: "lerobot-imitation",
    title: "Robot Learning with LeRobot",
    subtitle: "Leader–follower teleoperation to autonomous task execution",
    description:
      "A leader–follower teleoperation pipeline built on the LeRobot framework: demonstration datasets collected by hand, imitation-learning policies (ACT, Diffusion Policy) trained on GPU, and repeatable autonomous task execution on the arm.",
    tags: ["LeRobot", "Imitation Learning", "ACT", "Diffusion Policy", "Teleoperation", "PyTorch"],
    category: "AI/ML",
    year: "2025",
    cover: "/projects/lerobot/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Scripting manipulation tasks joint-by-joint doesn't generalize and breaks the moment the scene shifts. Imitation learning fixes that — but only with a clean teleoperation pipeline, good demonstrations, and disciplined training.",
      approach:
        "Built a leader–follower teleoperation rig on the LeRobot framework, collected demonstration datasets across task variations, and trained ACT and Diffusion Policy imitation policies on GPU. Deployed the trained policies back on the follower arm for repeatable autonomous execution.",
      highlights: [
        "Leader–follower teleop: demonstrations recorded exactly as the robot experiences them",
        "Both ACT and Diffusion Policy trained on the same task set",
        "GPU training loop with dataset curation — quality of demos over quantity",
        "Closed the loop: policies run autonomously and repeatably on hardware",
      ],
      stack: [
        { label: "Framework", value: "LeRobot (Hugging Face)" },
        { label: "Policies", value: "ACT, Diffusion Policy" },
        { label: "Training", value: "PyTorch, GPU" },
        { label: "Hardware", value: "Leader–follower arm pair" },
      ],
      outcome:
        "A complete demonstrate → train → deploy loop: tasks taught by showing, not coding — the workflow modern manipulation teams run daily.",
    },
  },
  {
    slug: "pipe-crawler-patent",
    title: "Pipe-Crawling Inspection Robot",
    subtitle: "Patented leech-inspired robot for industrial pipeline inspection",
    description:
      "A leech-inspired bi-directional pipeline inspection robot with compliant gripping — EPOS4 closed-loop field-oriented control of a Maxon EC 90 BLDC over CANopen, ROS–Gazebo modeling, and a YOLOv8 vision pipeline for real-time defect detection. Patent filed (App. No. 202531075372).",
    tags: ["Patent", "FOC", "CANopen", "Maxon BLDC", "YOLOv8", "ROS", "Gazebo"],
    category: "Control Systems",
    year: "2024",
    cover: "/projects/pipe-crawler/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Industrial pipelines need inspection and painting in confined spaces where humans can't go. A crawler must grip compliantly, move bi-directionally, hold position precisely, and see defects as it travels.",
      approach:
        "Designed a leech-inspired locomotion system with compliant gripping mechanisms and coordinated actuation. Implemented EPOS4-based closed-loop field-oriented control of a Maxon EC 90 Flat BLDC over CANopen, with a distributed microcontroller + Raspberry Pi architecture communicating over I2C. Modeled the system in ROS–Gazebo (URDF, PID tuning) and integrated a YOLOv8 vision pipeline for real-time defect detection during traversal.",
      highlights: [
        "Patent filed: leech-inspired coordinated locomotion for in-pipe inspection (App. No. 202531075372)",
        "Closed-loop FOC of a Maxon EC 90 Flat over CANopen with encoder-synchronized position tracking",
        "Distributed control: microcontrollers + Raspberry Pi over I2C for modularity and fault isolation",
        "YOLOv8 defect detection running live during traversal — perception-driven inspection",
      ],
      stack: [
        { label: "Motor control", value: "EPOS4, FOC, CAN/CANopen" },
        { label: "Actuation", value: "Maxon EC 90 Flat BLDC" },
        { label: "Simulation", value: "ROS, Gazebo, URDF, PID tuning" },
        { label: "Perception", value: "YOLOv8, Raspberry Pi" },
      ],
      outcome:
        "A patented inspection platform (filed at IIT Kharagpur, under examination) proving stable bi-directional locomotion in confined pipelines with live defect detection.",
    },
  },
  {
    slug: "prosthetic-gait-control",
    title: "ML-Driven Prosthetic Control",
    subtitle: "Real-time gait phase detection driving an active ankle — Chanakya Fellowship",
    description:
      "An end-to-end gait phase detection pipeline fusing wearable Movella IMU and FSR sensor data: annotated time-series dataset, XGBoost phase classifier, deployed on Raspberry Pi for real-time inference driving a Maxon DC motor over CAN for adaptive ankle control.",
    tags: ["XGBoost", "IMU", "Sensor Fusion", "Raspberry Pi", "CAN", "Wearables"],
    category: "AI/ML",
    year: "2025",
    cover: "/projects/prosthetic/cover.jpg",
    featured: true,
    caseStudy: {
      problem:
        "An active ankle prosthesis is only useful if it knows where the wearer is in the gait cycle — in real time, on embedded hardware, from noisy wearable sensors.",
      approach:
        "Fused Movella IMU and FSR (foot pressure) streams into a curated, annotated time-series dataset. Trained an XGBoost classifier for robust gait phase detection, then deployed it on a Raspberry Pi for real-time inference driving Maxon DC motor actuation over CAN — closing the loop from sensing to adaptive ankle control. Funded under the Chanakya Fellowship (TIH-IoT).",
      highlights: [
        "End-to-end: wearable sensing → annotated dataset → trained model → real-time actuation",
        "IMU + FSR fusion for phase detection robust to gait variation",
        "XGBoost chosen for reliable, low-latency embedded inference",
        "Maxon DC motor driven over CAN from live model output",
      ],
      stack: [
        { label: "Sensing", value: "Movella IMU, FSR arrays" },
        { label: "Model", value: "XGBoost gait phase classifier" },
        { label: "Deployment", value: "Raspberry Pi, CAN actuation" },
        { label: "Funding", value: "Chanakya Fellowship (TIH-IoT)" },
      ],
      outcome:
        "A working adaptive ankle control loop — ML inference on embedded hardware actuating a real prosthetic joint, delivered under a national fellowship.",
    },
  },
  {
    slug: "dobot-sdk",
    title: "Dobot Manipulator SDK",
    subtitle: "Custom Python libraries unlocking capabilities absent from the native SDK",
    description:
      "Engineered custom Python libraries for Dobot manipulators from the ground up — multi-style handwriting generation and 3D-printing extensions, capabilities the native SDK doesn't offer.",
    tags: ["Python", "SDK", "Manipulators", "Dobot", "Motion Control"],
    category: "Robotics",
    year: "2025",
    cover: "/projects/dobot/cover.jpg",
    featured: false,
    caseStudy: {
      problem:
        "The native Dobot SDK covers basic motion but nothing expressive: no handwriting synthesis, no 3D-printing pathway. Anything beyond pick-and-place meant building the library layer yourself.",
      approach:
        "Wrote Python libraries from the ground up over the low-level Dobot interface: trajectory generation for multi-style handwriting (letterform synthesis mapped to smooth end-effector paths) and an extension pipeline that turns the arms into functional 3D printers.",
      highlights: [
        "Ground-up library design over the raw device protocol",
        "Multi-style handwriting generation — letterforms to smooth trajectories",
        "3D-printing extension: slicer output executed on a manipulator",
        "Clean Python API so others build on it without touching the protocol layer",
      ],
      stack: [
        { label: "Hardware", value: "Dobot manipulators" },
        { label: "Capabilities", value: "Handwriting synthesis, 3D printing" },
        { label: "Languages", value: "Python" },
        { label: "Interface", value: "Custom protocol-level SDK" },
      ],
      outcome:
        "Capabilities the vendor never shipped — a reusable SDK layer that turned closed hardware into an open platform.",
    },
  },
  {
    slug: "robotic-arm-5dof",
    title: "5-DOF Robotic Arm",
    subtitle: "ROS2 kinematics & motion planning on a 3D-printed serial manipulator",
    description:
      "Designed and 3D-printed a 5-DOF serial manipulator; derived its kinematic model via Denavit–Hartenberg parameters, implemented forward/inverse kinematics, built URDF/XACRO models, and configured a ROS2–MoveIt2 pipeline for motion planning and execution.",
    tags: ["ROS2", "MoveIt2", "Kinematics", "URDF/XACRO", "3D Printing", "DH Parameters"],
    category: "Robotics",
    year: "2025",
    cover: "/projects/arm-5dof/cover.jpg",
    featured: false,
    caseStudy: {
      problem:
        "Off-the-shelf arms hide the math. Building a manipulator from scratch — mechanics, kinematics, and planning stack — is the only way to own every layer from CAD to trajectory execution.",
      approach:
        "Designed and 3D-printed a 5-DOF serial manipulator, derived the kinematic model via Denavit–Hartenberg parameters, and implemented forward/inverse kinematics for accurate end-effector pose estimation. Built URDF/XACRO models and configured the ROS2–MoveIt2 pipeline for motion planning, trajectory generation, and execution.",
      highlights: [
        "Full DH derivation with FK/IK implemented and validated against the physical arm",
        "URDF/XACRO models matching the printed hardware",
        "MoveIt2 pipeline: planning, trajectory generation, execution",
        "Designed, printed, and assembled in-house — CAD to motion",
      ],
      stack: [
        { label: "Kinematics", value: "DH parameters, FK/IK" },
        { label: "Planning", value: "ROS2, MoveIt2" },
        { label: "Modeling", value: "URDF/XACRO, Fusion 360" },
        { label: "Fabrication", value: "3D printing (Orca Slicer, Bambu Lab)" },
      ],
      outcome:
        "A complete scratch-built manipulation stack — the kinematics foundations that every later manipulation project stood on.",
    },
  },
  {
    slug: "multi-robot-llm-dispatcher",
    title: "Multi-Robot LLM Dispatcher",
    subtitle: "Natural-language task batches dispatched across a simulated fleet",
    description:
      "A LangGraph-based dispatcher that assigns natural-language task batches across a simulated multi-robot fleet (ROS2, Nav2, Gazebo), automatically reassigning tasks in real time when a robot fails or its battery runs low.",
    tags: ["LangGraph", "ROS2", "Nav2", "Gazebo", "Fleet Dispatch", "LLM Agents"],
    category: "Agentic AI",
    year: "2026",
    cover: "/projects/dispatcher/cover.jpg",
    featured: false,
    caseStudy: {
      problem:
        "Fleet operators think in missions — 'inspect these three aisles, deliver this crate' — not in per-robot goal poses. Translating language into robust fleet execution needs an LLM planner that survives robot failures.",
      approach:
        "Building a LangGraph dispatcher that decomposes natural-language task batches into per-robot assignments over a simulated ROS2/Nav2/Gazebo fleet. Live robot state — battery, health, progress — feeds back into the graph, and failed or low-battery robots trigger automatic real-time reassignment of their remaining tasks.",
      highlights: [
        "Natural-language mission input, typed task decomposition out",
        "Live feedback loop: battery and failure states re-enter the planning graph",
        "Automatic task reassignment with no operator intervention",
        "Full simulation stack: ROS2, Nav2, Gazebo — reproducible without hardware",
      ],
      stack: [
        { label: "Agents", value: "LangGraph" },
        { label: "Fleet", value: "ROS2, Nav2, Gazebo" },
        { label: "Dispatch", value: "Real-time reassignment logic" },
        { label: "Languages", value: "Python" },
      ],
      outcome:
        "In progress (2026) — the bridge between agentic planning and fleet robotics: language in, resilient multi-robot execution out.",
    },
  },
]

export const services = [
  {
    icon: "⬡",
    title: "Robotics Engineering",
    description:
      "Full-stack robotics — from URDF and kinematics to autonomous navigation and manipulation on real hardware.",
    items: [
      "ROS2 / Nav2 / MoveIt2 systems",
      "Autoware autonomy stacks",
      "Multi-robot fleet orchestration",
      "Simulation in Gazebo / MuJoCo",
    ],
  },
  {
    icon: "◈",
    title: "Robot Learning & AI",
    description:
      "Imitation learning and LLM-driven agentic pipelines that turn demonstrations and language into robot behavior.",
    items: [
      "Imitation learning (ACT, Diffusion Policy)",
      "LangGraph multi-agent pipelines",
      "YOLOv8 perception pipelines",
      "RAG & vector-embedding systems",
    ],
  },
  {
    icon: "⌬",
    title: "Embedded & Control",
    description:
      "Closed-loop motor control and edge deployment — the layer where software meets torque.",
    items: [
      "FOC / closed-loop BLDC control",
      "CAN / CANopen networks",
      "Jetson & Raspberry Pi deployment",
      "PID tuning & system modeling",
    ],
  },
]

export type SkillModule = {
  name: string
  code: string
  domain: "Autonomy" | "Perception" | "AI" | "Simulation" | "Systems" | "Embedded"
  years: number
  projects: number
  related: string[]
}

/** Interactive robotics-ecosystem modules — rendered as floating nodes, never bars. */
export const skills: SkillModule[] = [
  { name: "ROS2", code: "SYS-01", domain: "Autonomy", years: 2, projects: 7, related: ["Nav2", "MoveIt2", "Gazebo"] },
  { name: "Nav2 & SLAM", code: "NAV-02", domain: "Autonomy", years: 2, projects: 4, related: ["Cartographer", "Costmaps", "ROS2"] },
  { name: "MoveIt2", code: "MAN-03", domain: "Autonomy", years: 2, projects: 3, related: ["Kinematics", "URDF", "ROS2"] },
  { name: "Autoware", code: "AVW-04", domain: "Autonomy", years: 1, projects: 1, related: ["F1TENTH", "Planning", "Control"] },
  { name: "Imitation Learning", code: "AI-05", domain: "AI", years: 1, projects: 2, related: ["ACT", "Diffusion Policy", "LeRobot"] },
  { name: "LangGraph / Agents", code: "AI-06", domain: "AI", years: 1, projects: 2, related: ["LangChain", "RAG", "Pydantic"] },
  { name: "PyTorch", code: "AI-07", domain: "AI", years: 2, projects: 4, related: ["TensorFlow", "Scikit-learn", "GPU"] },
  { name: "YOLOv8 / Vision", code: "CV-08", domain: "Perception", years: 2, projects: 3, related: ["OpenCV", "Defect Detection", "Jetson"] },
  { name: "Sensor Fusion", code: "CV-09", domain: "Perception", years: 1, projects: 2, related: ["IMU", "FSR", "XGBoost"] },
  { name: "Gazebo / MuJoCo", code: "SIM-10", domain: "Simulation", years: 2, projects: 4, related: ["URDF/XACRO", "PID", "ROS2"] },
  { name: "URDF / XACRO", code: "SIM-11", domain: "Simulation", years: 2, projects: 4, related: ["DH Params", "CAD", "Gazebo"] },
  { name: "Python", code: "LNG-12", domain: "Systems", years: 4, projects: 9, related: ["C/C++", "Java", "Shell"] },
  { name: "C / C++", code: "LNG-13", domain: "Systems", years: 3, projects: 4, related: ["Embedded", "ROS2", "Arduino"] },
  { name: "Docker / Linux", code: "OPS-14", domain: "Systems", years: 2, projects: 6, related: ["Git", "CI", "Ubuntu"] },
  { name: "CAN / CANopen", code: "EMB-15", domain: "Embedded", years: 2, projects: 3, related: ["EPOS4", "FOC", "Maxon"] },
  { name: "Jetson / RasPi", code: "EMB-16", domain: "Embedded", years: 2, projects: 4, related: ["Arduino", "Edge AI", "I2C"] },
  { name: "CAD & 3D Printing", code: "MEC-17", domain: "Embedded", years: 4, projects: 5, related: ["SolidWorks", "Fusion 360", "FEA"] },
]

export type LogEntry = {
  year: string
  title: string
  org: string
  description: string
  systems: string[]
  status: "ACTIVE" | "ARCHIVED"
}

/** Career history rendered as command-center mission logs. */
export const timeline: LogEntry[] = [
  {
    year: "2025",
    title: "Robotics Engineer",
    org: "NxtWave Disruptive Technologies",
    description:
      "Agentic multi-LLM assessment pipelines, Autoware on F1TENTH, heterogeneous multi-robot fleet control, custom manipulator SDKs, and LeRobot imitation-learning pipelines — Hyderabad, Oct 2025 to present.",
    systems: ["LangGraph", "Autoware", "ROS2", "LeRobot"],
    status: "ACTIVE",
  },
  {
    year: "2024",
    title: "Pre-Doctoral Research Fellow",
    org: "IIT Kharagpur",
    description:
      "Patented leech-inspired pipe-crawling inspection robot (FOC over CANopen, YOLOv8 defect detection) and ML-driven prosthetic gait control under the Chanakya Fellowship — Aug 2024 to Sep 2025.",
    systems: ["FOC", "CANopen", "YOLOv8", "XGBoost"],
    status: "ARCHIVED",
  },
  {
    year: "2024",
    title: "B.Tech, Mechanical Engineering",
    org: "KITS Warangal",
    description:
      "Mechanical Engineering with a Minor in Electronics & Communication — the mechatronics foundation under everything since.",
    systems: ["Mechanical", "ECE Minor", "CAD", "FEA"],
    status: "ARCHIVED",
  },
  {
    year: "2021",
    title: "Team Captain — Formula Student",
    org: "Team Force Racing (SAE, KITSW)",
    description:
      "Led the Formula Student team in Formula Bharat and the Indian Super Karting Series — Head of Powertrain and SAE Club Chairman. Intake–exhaust design in Ricardo WAVE & ANSYS Fluent, transmission and disc brakes in Fusion 360, electric kart integration, KTM 390 engine wiring.",
    systems: ["Formula Bharat", "Powertrain", "ANSYS", "Fusion 360"],
    status: "ARCHIVED",
  },
]

export const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We align on goals, constraints, and success criteria. I learn your system architecture and requirements.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "I propose a technical architecture — algorithms, toolchain, simulation plan, and milestones.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative development with regular demos. You stay in the loop at every stage.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Clean code, documentation, and handoff. I'm available for post-delivery questions.",
  },
]
