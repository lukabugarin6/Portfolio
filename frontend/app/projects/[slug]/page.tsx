import ProjectContact from "@/components/project-contact";
import { getProjectBySlug } from "@/lib/projects";
import Image from "next/image";

// @ts-ignore
export default async function SingleProjectPage({ params }) {
  const { data: project, error } = await getProjectBySlug(params.slug);
  // const project = projectsData.find((p) => p.slug === params.slug);

  if (error) return <div>Something went wrong</div>

  return (
    <div>
      <section className="max-w-[1140px] mx-auto mb-[140px]">
        <h1 className="normal-case mt-2 mb-2 text-[40px] leading-[50px] text-gray-800">
          {project?.title}
        </h1>
        <h2 className="text-gray-400 text-base font-normal leading-7">
          {project?.stack}
        </h2>
        <div className="grid grid-cols-2 mt-[100px] mb-[140px] gap-x-[50px]">
          <div>
            <h3 className="normal-case mb-2 text-xl font-normal leading-8 text-gray-600">
              Project Overview
            </h3>
            <p className="text-gray-400 text-base font-normal leading-7">
              {project?.overview}
            </p>
          </div>
          <div>
            <h3 className="normal-case mb-2 text-xl font-normal leading-8 text-gray-600">
              My Contributions
            </h3>
            <p className="text-gray-400 text-base font-normal leading-7">
              {project?.contributions}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-[30px] grid grid-cols-1 gap-[30px]">
        {project?.images.reverse().map((image, index) => (
          <div className="relative" key={index}>
            <Image
              src={image.imageUrl}
              width={0}
              height={0}
              alt={image.imageUrl}
              sizes="100%"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </section>
      <ProjectContact />
    </div>
  );
}
