import React from "react";
import "../components/Goals/Goals.css";
import Navbar from "../components/NavBar/Navbar";
import BackButton from "../components/BackButton/BackButton";
import NewNavbar from "../components/NavBar/NewNavbar";

const Goals = () => {
  return (
    <div className="app">
      <NewNavbar />
      <div className="content">
        <div className="backbutton">
          <BackButton destination="/journals" />
          <h1>Sustainability Goals</h1>
        </div>

        {/* <div className="goals-container">
                <div className="goal one">
                    <h2>Goal 1: No Poverty</h2>
                    <p>End poverty in all its forms everywhere</p>
                </div>
                <div className="goal two">
                    <h2>Goal 2: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition and promote sustainable agriculture</p>
                </div>
                <div className="goal three">
                    <h2>Goal 3: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages</p>
                </div>
                <div className="goal four">
                    <h2>Goal 4: Quality education</h2>
                    <p>Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all</p>
                </div>
                <div className="goal five">
                    <h2>Goal 5: Gender equality</h2>
                    <p>Achieve gender equality and empower all women and girls</p>
                </div>
                <div className="goal six">
                    <h2>Goal 6: Clean water and sanitation</h2>
                    <p>Ensure availability and sustainable management of water and sanitation for all</p>
                </div>
                <div className="goal seven">
                    <h2>Goal 7: Affordable and clean energy</h2>
                    <p>Ensure access to affordable, reliable, sustainable and modern energy for all</p>
                </div>
                <div className="goal eight">
                    <h2>Goal 8: Decent work and economic growth</h2>
                    <p>Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all</p>
                </div>
                <div className="goal nine">
                    <h2>Goal 9: Industry, Innovation and Infrastructure</h2>
                    <p>Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation</p>
                </div>
                <div className="goal ten">
                    <h2>Goal 10: Reduces inequality</h2>
                    <p>Reduce inequality within and among countries</p>
                </div>
                <div className="goal eleven">
                    <h2>Goal 11: Sustainable cities and communities</h2>
                    <p>Make cities and human settlements inclusive, safe, resilient and sustainable</p>
                </div>
                <div className="goal tewlve">
                    <h2>Goal 12: Responsible consumption and production</h2>
                    <p>Ensure sustainable consumption and production patterns</p>
                </div>
                <div className="goal thirteen">
                    <h2>Goal 13: Climate action</h2>
                    <p>Take urgent action to combat climate change and its impacts</p>
                </div>
                <div className="goal fourteen">
                    <h2>Goal 14: Life below water</h2>
                    <p>Conserve and sustainably use the oceans, seas and marine resources for sustainable development</p>
                </div>
                <div className="goal fifteen">
                    <h2>Goal 15: Life on land</h2>
                    <p>Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss</p>
                </div>
                <div className="goal sixteen">
                    <h2>Goal 16: Peace, justice and strong institutions</h2>
                    <p>Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels</p>
                </div>
                <div className="goal seventeen">
                    <h2>Goal 17: Partnership for the goals</h2>
                    <p>Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development</p>
                </div>
            </div> */}

        <div className="motivation_letter">
          <h2>
            Unlock the Sustainability Certificate: Your Commitment to a
            Sustainable Future
          </h2>
          <p>
            Embark on a journey towards a more sustainable future with
            Sustainability Diary. Each journal entry and task completed brings
            you closer to unlocking the prestigious Sustainability Certificate.
            This isn't just a badge of honor; it's a symbol of your dedication
            to environmental stewardship and sustainability within your field.
            By actively participating in tasks that promote sustainability
            awareness and reflection, you're making a tangible impact on our
            planet. Every journal you write contributes to a collective effort
            for positive change. With each task completed, you're not just
            gaining knowledge but also actively shaping a more sustainable
            world.
          </p>
          <p>
            Keep journaling, keep engaging with tasks, and keep pushing the
            boundaries of sustainability. Your commitment today will pave the
            way for a brighter tomorrow. Together, let's create a world where
            sustainability isn't just a goal but a way of life. Start your
            journey today and unlock the Sustainability Certificate as a
            testament to your dedication and passion for a more sustainable
            future.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Goals;
