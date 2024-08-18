import { useEffect, useState } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";
import "./NavBar.css";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";

export default function NavBar() {
  const { scrollPosition } = useDetectScroll();
  const [visibility, setVisibility] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const maxScroll = 600;
    const percentage = Math.min(scrollPosition.top / maxScroll, 1);
    setVisibility(percentage);

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = scrollPosition.top;
    const maxScrollPosition = documentHeight - windowHeight;
    const progress = Math.min(scrollTop / maxScrollPosition, 1) * 100;
    setScrollProgress(progress);
  }, [scrollPosition.top]);

  const [githubusername, setGithubusername] = useState("Tinshea");
  const [linkedinusername, setLinkedinusername] = useState("malek-bouzarkouna");

  return (
    <div className="navbar">
      {/* SideNavBar */}
      <div
        style={{
          opacity: 1 - visibility,
          transform: `translateY(${visibility * -50}px)`,
          transition: "opacity 0.5s ease, transform 0.5s ease",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 2500,
        }}
      >
        <SideNavBar githubusername={githubusername} linkedinusername={linkedinusername} />
      </div>

      {/* TopNavBar */}
      <div
        style={{
          opacity: visibility,
          transform: `translateY(${(1 - visibility) * -50}px)`,
          transition: "opacity 0.5s ease, transform 0.5s ease",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 3000, 
        }}
      >
        <TopNavBar githubusername={githubusername} linkedinusername={linkedinusername} progress={scrollProgress} />
      </div>
    </div>
  );
}
