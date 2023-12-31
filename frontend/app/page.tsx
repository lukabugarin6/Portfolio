import Contact from "@/components/contact";
import Experience from "@/components/experience";
import ProjectsGrid from "@/components/projects-grid";
import { getExperiences } from "@/lib/experiences";
import { getProjects } from "@/lib/projects";
import { getSectionByIdentifier } from "@/lib/sections";

export default async function Home() {
  const { data: projectsData } = await getProjects();
  const { data: experiencesData } = await getExperiences();
  const { data: heroSectionData } = await getSectionByIdentifier("hero");

  return (
    <>
      <section>
        <div className="w-full  md:w-auto max-w-[1140px] md:mx-[30px] xl:mx-auto mb-[70px] md:mb-[140px]">
          <h3 className="text-xl font-normal leading-8">{heroSectionData?.subtitle}</h3>
          <h2 className="text-gray-400 text-base font-normal leading-7">
            {heroSectionData?.title}
          </h2>
          <h1 className="normal-case mt-2 mb-2 text-[26px] leading-[34px] md:text-[40px] md:leading-[50px]">
            {heroSectionData?.paragraph}
          </h1>
        </div>
      </section>
      <ProjectsGrid projectsData={projectsData} />
      <Experience experiencesData={experiencesData} />
      <Contact />
    </>
  );
}
