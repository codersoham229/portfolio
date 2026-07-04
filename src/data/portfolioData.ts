export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

export const portfolioData = {
  name: "Soham Malekar",
  title: "Information Technology Student & Builder",
  subtitle: "Soham Malekar",
  role: "IT Student & Decentralized System Builder",
  location: "Mumbai, India",
  score: "89.03%",
  education: {
    diploma: "Diploma in Information Technology",
    school: "Vidyalankar Polytechnic",
    extra: "Enrolled in VIIE expanding knowledge through Business Communication, Psychology, Economics, American History, and Music."
  },
  bio: "I'm an Information Technology student passionate about building intelligent, scalable, and impactful software. My interests span Artificial Intelligence, Full Stack Development, Blockchain, and emerging technologies, with a strong focus on creating solutions that solve real-world problems.",
  projects: [
    {
      title: "BlockTix",
      description: "Blockchain-based event ticketing & verification system built with React, Supabase, and Ethereum (Sepolia). Organizers create events, mint NFT tickets, and verify attendees via QR code. Attendees earn downloadable digital badges.",
      tags: ["React", "Supabase", "Ethereum", "Sepolia", "Web3"],
      liveUrl: "https://event-verification-system-on-blockc.vercel.app/",
      githubUrl: "https://github.com/codersoham229/",
      image: "/blocktix.png"
    },
    {
      title: "Neuron Net",
      description: "Decentralized compute engine on Monad. Idle GPUs earn revenue while developers get instant low-latency power for parallel execution.",
      tags: ["React", "Monad Blockchain", "Decentralized Compute", "GPU Sharing"],
      liveUrl: "https://neuronnet-pjkm.vercel.app/",
      githubUrl: "https://github.com/codersoham229/",
      image: "/neuronnet.png"
    },
    {
      title: "Quantum Entanglement Lab",
      description: "A real-time multiplayer simulation of quantum entanglement and Bell's Theorem, featuring live experiment synchronization, statistical visualization, and interactive measurement controls.",
      tags: ["Next.js", "Socket.io", "Multiplayer", "Quantum Physics", "Framer Motion"],
      liveUrl: "",
      githubUrl: "https://github.com/codersoham229/",
      image: "/quantumlab.png"
    },
    {
      title: "E-Commerce Website",
      description: "ShopKart: A premium shopping website for tech, gadgets, and lifestyle products, curated for the modern buyer with a fast drop release system.",
      tags: ["Next.js", "Tailwind CSS", "Responsive Design", "E-Commerce"],
      liveUrl: "https://college-assignmento.vercel.app/",
      githubUrl: "https://github.com/codersoham229/",
      image: "/shopkart.png"
    }
  ] as Project[],
  skills: [
    {
      category: "Frontend Development",
      items: [
        { name: "HTML5", percentage: 74 },
        { name: "CSS3", percentage: 70 },
        { name: "Responsive Design", percentage: 75 }
      ]
    },
    {
      category: "UI/UX Design Tools",
      items: [
        { name: "Figma", percentage: 80 },
        { name: "Canva", percentage: 75 }
      ]
    },
    {
      category: "AI & Innovation",
      items: [
        { name: "Prompt Engineering", percentage: 85 },
        { name: "Generative AI", percentage: 75 },
        { name: "Communication Skills", percentage: 78 }
      ]
    }
  ] as SkillCategory[],
  contact: {
    email: "sohamgamer99@gmail.com",
    phone: "+91 8928463736",
    location: "Mumbai, Maharashtra",
    github: "https://github.com/codersoham229/",
    linkedin: "https://in.linkedin.com/in/soham-dev29",
    instagram: "https://www.instagram.com/being_sohamm/",
    twitter: "https://x.com/0xSohamm"
  } as ContactInfo
};
