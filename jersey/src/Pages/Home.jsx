import React from "react";
import { Link, useParams } from "react-router-dom";
import SlideShow from "./SlideShow";

/* ===== IMAGES ===== */
import FCBHome from "../photos/FCBHome.jpg";
import FCBAway from "../photos/FCBAway.jpg";
import FCB3rd from "../photos/FCB3rd.jpg";

import RMHome from "../photos/RMHome.jpg";
import RMAway from "../photos/RMAway.jpg";
import RM3rd from "../photos/RM3rd.jpg";

import ManUHome from "../photos/ManUHome.jpg";
import ManUAway from "../photos/ManUAway.jpg";
import ManU3rd from "../photos/ManU3rd.jpg";

import ChelseaHome from "../photos/ChelseaHome.jpg";
import ChelseaAway from "../photos/ChelseaAway.jpg";
import Chelsea3rd from "../photos/Chelsea3rd.jpg";

import ArsenalHome from "../photos/ArsenalHome.jpg";
import ArsenalAway from "../photos/ArsenalAway.jpg";
import Arsenal3rd from "../photos/Arsenal3rd.jpg";

import livHome from "../photos/livHome.jpg";
import livAway from "../photos/livAway.jpg";
import liv3rd from "../photos/liv3rd.jpg";

import ArgHome from "../photos/ArgHome.jpg";
import GerHome from "../photos/GerHome.jpg";
import FranceHome from "../photos/FranceHome.jpg";
import SpainHome from "../photos/SpainHome.jpg";
import EngHome from "../photos/EngHome.jpg";

const Home = ({ filterCategory = "", searchQuery = "" }) => {

  const { type } = useParams(); 

  const activeCategory = type || filterCategory;

  const query = searchQuery.toLowerCase().trim();

  const teams = [
    {
      teamName: "Real Madrid",
      category: "club",
      description:" Real Madrid Club de Fútbol, commonly known as Real Madrid, is one of the most successful and prestigious football clubs in the world. Founded in 1902, the club has a rich history of domestic and international achievements, including numerous La Liga titles and UEFA Champions League trophies. Known for its iconic white kits and a legacy of legendary players such as Alfredo Di Stéfano, Cristiano Ronaldo, and Zinedine Zidane, Real Madrid is renowned for its attacking style of play and commitment to excellence. The club's home ground, Santiago Bernabéu Stadium, is one of the most famous football venues globally, attracting fans from all over the world.",
      jerseys: [
        { id: 1, imageSrc: RMHome, name: "Real Madrid Home 25/26", price: 79.99 },
        { id: 2, imageSrc: RMAway, name: "Real Madrid Away 25/26", price: 79.99 },
        { id: 3, imageSrc: RM3rd, name: "Real Madrid Third 25/26", price: 79.99 },
      ],
    },
    {
      teamName: "FC Barcelona",
      category: "club",
      description:" FC Barcelona, known as Barça, is one of the most iconic football clubs in the world. Founded in 1899, the club has a rich history of success both domestically and internationally. Barça is renowned for its attacking style of play, youth development through its famed La Masia academy, and a strong commitment to its Catalan identity. The club has won numerous La Liga titles, Copa del Rey trophies, and UEFA Champions League titles. With legendary players like Lionel Messi having donned the Blaugrana colors, FC Barcelona continues to be a symbol of footballing excellence and cultural pride.",
      jerseys: [
        { id: 4, imageSrc: FCBHome, name: "FC Barcelona Home 25/26", price: 89.99 },
        { id: 5, imageSrc: FCBAway, name: "FC Barcelona Away 25/26", price: 89.99 },
        { id: 6, imageSrc: FCB3rd, name: "FC Barcelona Third 25/26", price: 89.99 },
      ],
    },
    {
      teamName: "Manchester United",
      category: "club",
      description:" Manchester United is one of the most successful and popular football clubs in the world. Founded in 1878, the club has a rich history of achievements, including numerous Premier League titles, FA Cups, and UEFA Champions League trophies. Known for its iconic red jersey and legendary players like Sir Alex Ferguson, George Best, and Cristiano Ronaldo, Manchester United has a global fanbase. The club is also recognized for its youth development system and its commitment to excellence both on and off the pitch.",
      jerseys: [
        { id: 7, imageSrc: ManUHome, name: "Manchester United Home 25/26", price: 69.99 },
        { id: 8, imageSrc: ManUAway, name: "Manchester United Away 25/26", price: 69.99 },
        { id: 9, imageSrc: ManU3rd, name: "Manchester United Third 25/26", price: 69.99 },
      ],
    },
    {
      teamName: "Chelsea",
      category: "club",
      description:" Chelsea Football Club, based in London, is a prominent football team known for its rich history and success in both domestic and international competitions. Founded in 1905, Chelsea has won numerous Premier League titles, FA Cups, and UEFA Champions League trophies. The club is recognized for its strong defensive play, tactical discipline, and the ability to attract top talent from around the world. With a passionate fanbase and a reputation for resilience, Chelsea continues to be a major force in English and European football.",
      jerseys: [
        { id: 10, imageSrc: ChelseaHome, name: "Chelsea Home 25/26", price: 75.00 },
        { id: 11, imageSrc: ChelseaAway, name: "Chelsea Away 25/26", price: 75.00 },
        { id: 12, imageSrc: Chelsea3rd, name: "Chelsea Third 25/26", price: 75.00 },
      ],
    },
    {
      teamName: "Arsenal",
      category: "club",
      description:" Arsenal Football Club, based in London, is one of the most storied and successful football clubs in England. Founded in 1886, Arsenal has a rich history of domestic and international achievements, including multiple Premier League titles and FA Cups. Known for its attractive style of play, often characterized by quick passing and attacking football, Arsenal has produced legendary players such as Thierry Henry, Dennis Bergkamp, and Patrick Vieira. The club's iconic red and white kits are recognized worldwide, and Arsenal continues to be a major force in English football with a passionate global fanbase.",
      jerseys: [
        { id: 13, imageSrc: ArsenalHome, name: "Arsenal Home 25/26", price: 85.00 },
        { id: 14, imageSrc: ArsenalAway, name: "Arsenal Away 25/26", price: 85.00 },
        { id: 15, imageSrc: Arsenal3rd, name: "Arsenal Third 25/26", price: 85.00 },
      ],
    },
    {
      teamName: "Liverpool",
      category: "club",
      description:" Liverpool Football Club, based in Liverpool, England, is one of the most successful and storied football clubs in the world. Founded in 1892, Liverpool has a rich history of domestic and international success, including numerous English league titles and UEFA Champions League trophies. Known for their passionate fanbase, iconic anthem 'You'll Never Walk Alone,' and attacking style of play, Liverpool has produced legendary players such as Kenny Dalglish, Steven Gerrard, and Ian Rush. The club's home ground, Anfield, is renowned for its electrifying atmosphere, making Liverpool a formidable force in both English and European football.",
      jerseys: [
        { id: 16, imageSrc: livHome, name: "Liverpool Home 25/26", price: 80.00 },
        { id: 17, imageSrc: livAway, name: "Liverpool Away 25/26", price: 80.00 },
        { id: 18, imageSrc: liv3rd, name: "Liverpool Third 25/26", price: 80.00 },
      ],
    },
    {
      teamName: "Argentina",
      category: "country",
      description:" The Argentina national football team, known as La Albiceleste, is one of the most successful and storied teams in international football. With a rich history that includes multiple FIFA World Cup victories and Copa América titles, Argentina has produced some of the greatest footballers in history, including Diego Maradona and Lionel Messi. The team is renowned for its passionate playing style, technical skill, and strong footballing culture. Argentina's iconic blue and white striped jerseys are recognized worldwide, symbolizing the nation's deep love for the sport.",
      jerseys: [{ id: 19, imageSrc: ArgHome, name: "Argentina Home 25/26", price: 110.00 }],
    },
    {
      teamName: "Germany",
      category: "country",
      description:" The Germany national football team, known as Die Mannschaft, is one of the most successful and respected teams in international football. With a rich history that includes multiple FIFA World Cup victories and UEFA European Championship titles, Germany has produced legendary players such as Franz Beckenbauer, Gerd Müller, and Miroslav Klose. The team is renowned for its disciplined playing style, tactical prowess, and strong team ethic. Germany's iconic white and black jerseys symbolize the nation's footballing excellence and commitment to success on the global stage.",
      jerseys: [{ id: 20, imageSrc: GerHome, name: "Germany Home 25/26", price: 90.00 }],
    },
    {
      teamName: "France",
      category: "country",
      description:" The France national football team, known as Les Bleus, is one of the most successful and celebrated teams in international football. With a rich history that includes multiple FIFA World Cup victories and UEFA European Championship titles, France has produced legendary players such as Zinedine Zidane, Michel Platini, and Kylian Mbappé. The team is renowned for its flair, technical skill, and tactical versatility. France's iconic blue jerseys symbolize the nation's footballing excellence and its commitment to showcasing a dynamic and entertaining style of play on the global stage.",
      jerseys: [{ id: 21, imageSrc: FranceHome, name: "France Home 25/26", price: 89.99 }],
    },
    {
      teamName: "Spain",
      category: "country",
      description:" The Spain national football team, known as La Roja, is one of the most successful and influential teams in international football. With a rich history that includes multiple FIFA World Cup victories and UEFA European Championship titles, Spain has produced legendary players such as Xavi Hernandez, Andres Iniesta, and Sergio Ramos. The team is renowned for its possession-based playing style, technical excellence, and tactical intelligence. Spain's iconic red jerseys symbolize the nation's footballing prowess and its commitment to a beautiful and effective style of play on the global stage.",
      jerseys: [{ id: 22, imageSrc: SpainHome, name: "Spain Home 25/26", price: 95.00 }],
    },
    {
      teamName: "England",
      category: "country",
      description:" The England national football team, known as the Three Lions, is one of the most successful and celebrated teams in international football. With a rich history that includes multiple FIFA World Cup appearances and UEFA European Championship titles, England has produced legendary players such as David Beckham, Wayne Rooney, and Harry Kane. The team is renowned for its physical strength, tactical discipline, and passionate fanbase. England's iconic red jerseys symbolize the nation's footballing excellence and its commitment to showcasing a strong and competitive style of play on the global stage.",
      jerseys: [{ id: 23, imageSrc: EngHome, name: "England Home 25/26", price: 100.00 }],
    },
  ];

  /* ===== FILTERING ===== */
  const categoryFiltered = activeCategory
    ? teams.filter((team) => team.category === activeCategory)
    : teams;

  const matchedTeams = query
    ? categoryFiltered.filter(
        (team) =>
          team.teamName.toLowerCase().includes(query) ||
          team.jerseys.some((j) => j.name.toLowerCase().includes(query))
      )
    : categoryFiltered;

  const suggestedTeams = query
    ? categoryFiltered.filter((team) => !matchedTeams.includes(team))
    : [];

  return (
    <div className="bg-slate-400 min-h-screen">
      {/* MATCHED RESULTS */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none p-6">
  {matchedTeams.length > 0 ? (
    matchedTeams.map((team) => (
      <div key={team.teamName} className="w-full">
        <h2 className="text-center text-sm md:text-base font-bold mb-2 uppercase text-white">
          {team.teamName}
        </h2>

        <Link
          to={`/club/${team.teamName.toLowerCase().replace(/\s+/g, "")}`}
          state={{ team }}
          className="block w-full"
        >
          <SlideShow jerseys={team.jerseys} />
        </Link>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-20 text-white">
      <h3 className="text-2xl font-bold">
        No results found for "{searchQuery}"
      </h3>
    </div>
  )}
</div>
      {/* SUGGESTIONS */}
      {suggestedTeams.length > 0 && (
        <div className="p-6 border-t border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-white italic">
            Recommended for you
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
            {suggestedTeams.slice(0, 4).map((team) => (
              <Link
                key={team.teamName}
                to={`/club/${team.teamName.toLowerCase().replace(/\s+/g, "")}`}
                state={{ team }}
                className="block"
              >
                <h2 className="text-center text-sm font-bold mb-2 text-white">
                  {team.teamName}
                </h2>
                <SlideShow jerseys={team.jerseys} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
