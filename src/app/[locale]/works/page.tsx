import { getTranslations, setRequestLocale } from "next-intl/server";
import Markdown from "react-markdown";
import Image from "next/image";

import { getBasicPageMetadata } from "@/lib/helpers";
import { Pathname } from "@/lib/types";

import ohmitocondria from "@/assets/images/oh mitocondria.jpg";
import granexistencia from "@/assets/images/en la gran existencia.jpg";
import neuromantra from "@/assets/images/neuromantra.jpg";
import elfocorporativo from "@/assets/images/elfo corporativo.jpg";
import belleepoque from "@/assets/images/la belle epoque.jpg";
import lacajanegra from "@/assets/images/la caja negra.jpg";
import balbucear from "@/assets/images/brabbeln babillage balbucear.webp";
import Link from "next/link";
import NewTab from "@/components/ui/NewTab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("works");

  return getBasicPageMetadata({
    locale,
    pathname: Pathname.WORKS,
    localizedPageTitle: t("title"),
  });
}

export default async function Works({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("works");

  const titleMitocondria = "¡oh mitocondria!";
  const titleExistencia = "en la gran existencia";
  const titleNeuromantra = "neuro:mantra";
  const titleElfo = "Elfo Corporativo";
  const titleBelleEpoque = "La Belle Époque";
  const titleIntensaHierba = "Una Intensa Hierba";
  const titleCajaNegra = "La Caja Negra #5";
  const titleBalbucear = "Brabbeln, Babillage, Balbucear";

  return (
    <main className="main-container">
      <h1 className="sr-only">{t("title")}</h1>
      <div className="text-lg dash-list-child [&>p]:pb-2">
        <Markdown>{t("paragraph1")}</Markdown>
      </div>
      <div className="pt-3 text-lg dash-list-child [&>p]:pb-2">
        <Markdown>{t("paragraph2")}</Markdown>
      </div>
      <section aria-label={t('sectionAriaLabel')}>
        <ul className="pt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
          <li>
            <Link
              className="block block-link-hover-style block-link-active-style reset-focus-block"
              href="https://promesaeditorial.com.ar/productos/elfo-corporativo-rita-gonzalez-hesaynes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="book-container">
                <Image
                  src={elfocorporativo}
                  alt={`${t("altText1")} ${titleElfo}`}
                />
                <figcaption className="book-caption">
                  <span>{titleElfo}</span>
                  <NewTab />
                </figcaption>
              </figure>
            </Link>
          </li>
          <li>
            <figure className="book-container">
              <Image
                src={neuromantra}
                alt={`${t("altText1")} ${titleNeuromantra}`}
              />
              <figcaption className="book-caption">
                <span>{titleNeuromantra}</span>
              </figcaption>
            </figure>
          </li>
          <li>
            <Link
              className="block block-link-hover-style block-link-active-style reset-focus-block"
              href="https://tienda.lalibre.com.ar/productos/en-la-gran-existencia-rita-gonzalez-hesaynes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="book-container">
                <Image
                  src={granexistencia}
                  alt={`${t("altText1")} ${titleExistencia}`}
                />
                <figcaption className="book-caption">
                  <span>{titleExistencia}</span>
                  <NewTab />
                </figcaption>
              </figure>
            </Link>
          </li>
          <li>
            <figure className="book-container">
              <Image
                src={ohmitocondria}
                alt={`${t("altText1")} ${titleMitocondria}`}
              />
              <figcaption className="book-caption">
                <span>{titleMitocondria}</span>
              </figcaption>
            </figure>
          </li>
          <li>
            <figure className="book-container">
              <Image
                src={belleepoque}
                alt={`${t("altText1")} ${titleBelleEpoque}`}
              />
              <figcaption className="book-caption">
                <span>{titleBelleEpoque}</span>
              </figcaption>
            </figure>
          </li>
          <li>
            <figure className="book-container">
              <Image src={lacajanegra} alt={`${t("altText1")} ${titleCajaNegra}`} />
              <figcaption className="book-caption flex flex-col items-center">
                <span>{titleIntensaHierba}</span>
                <span>{`${t("altText2")} "${titleCajaNegra}"`}</span>
              </figcaption>
            </figure>
          </li>
          <li>
            <Link
              className="block block-link-hover-style block-link-active-style reset-focus-block"
              href="https://www.isbn.de/buch/9783910561038/brabbeln-babillage-balbucear"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="book-container">
                <Image src={balbucear} alt={`${t("altText1")} ${titleBalbucear}`} />
                <figcaption className="book-caption">
                  <span>{titleBalbucear}</span>
                  <NewTab />
                </figcaption>
              </figure>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
