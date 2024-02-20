import LandingScreen from "@/components/home/landingScreen";
import { createURL, getData } from "@/lib/sanityClient";
import { getUpcomingEventsData } from "@/lib/calendarClient";
import UpcomingEvents from "@/components/home/upcomingEvents";
import ContentBlock from "@/components/home/contentBlock";


export default async function Home() {
  const settingsURL = createURL("siteSettings");
  const artistURL = createURL("artist");
  const settingsData = await getData(settingsURL);
  const artistData = await getData(artistURL);
  const siteInfo = settingsData.result[0];
  const artistImages = artistData.result.slice(0, Math.min(4, artistData.result.length)).map((a: { Image: object }) => a.Image);
  const landingInfo = {
    backgroundImage: siteInfo.homepageInfo.landingImage,
    statement: siteInfo.homepageInfo.landingText,
    visartsIcon: siteInfo.homepageInfo.visartsIcon,
  }
  const upcomingEventsData = await getUpcomingEventsData();
  const upcomingEvents = upcomingEventsData.events;
  return (
    <main>
      <section>
        <LandingScreen landingInfo={landingInfo} />
      </section>
      <section>
        <ContentBlock
          title="Artist Spotlight"
          text={siteInfo.homepageInfo.spotlightText}
          images={artistImages}
          imageSpan={8}
          textSpan={4}
          orientation="left"
          color='var(--mantine-color-secondary-3)'
          link="/artists" />
      </section>
      <section>
        <ContentBlock
          title="Brown Gallery" 
          text={siteInfo.homepageInfo.brownGalleryText} 
          image={siteInfo.homepageInfo.brownGalleryImage} 
          imageSpan={8} 
          textSpan={4} 
          orientation="right"
          color='var(--mantine-color-primary-4)'
          link='/brown-gallery' />
      </section>
      <section>
      <ContentBlock
          title="Figure Drawing" 
          text={siteInfo.homepageInfo.figureDrawingText} 
          image={siteInfo.homepageInfo.figureDrawingImage} 
          imageSpan={8} 
          textSpan={4} 
          orientation="left"
          color='var(--mantine-color-accent-1)'
          link={siteInfo.events.link && siteInfo.events.link !== ""? siteInfo.events.link : '/events' } />
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <UpcomingEvents events={upcomingEvents} text={siteInfo.homepageInfo.eventsText}/>
      </section>
    </main>
  );
}
