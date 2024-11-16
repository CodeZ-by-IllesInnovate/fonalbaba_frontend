import { notFound } from "next/navigation";
import ImageSlider from "../ImageSlider";

export default async function ProductPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/mintaks?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();

  if (!data.data.length) {
    notFound();
  }

  const formattedPattern = data.data.map((pattern) => ({
    id: pattern.id,
    title: pattern.title,
    slug: pattern.slug,
    leiras: pattern.leiras,
    bovebben: pattern.bovebben,
    price: pattern.price || "N/A", // Ár kezelése
    images:
      pattern.image?.length > 0
        ? pattern.image.map((img) => `${process.env.NEXT_PUBLIC_URL}${img.url}`)
        : [],
  }))[0];

  return (
    <section className="py-8 md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Image Section */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {formattedPattern.images.length > 0 ? (
              <ImageSlider images={formattedPattern.images} />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
              {formattedPattern.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl ">
                ${formattedPattern.price}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4"
              >
                Érdeklődés
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 " />

            {/* Product Description */}
            <p className="mb-6 text-gray-500 ">{formattedPattern.leiras}</p>
            <p
              className="text-gray-500 "
              dangerouslySetInnerHTML={{ __html: formattedPattern.bovebben }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
