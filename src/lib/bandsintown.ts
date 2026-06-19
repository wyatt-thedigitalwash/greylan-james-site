export interface BandsintownEvent {
  date: string;
  time: string;
  venue: string;
  city: string;
  ticketUrl: string;
  eventUrl: string;
}

interface BandsintownOffer {
  type: string;
  url: string;
  status: string;
}

interface BandsintownApiEvent {
  datetime: string;
  venue: {
    name: string;
    city: string;
    region: string;
    country: string;
  };
  offers: BandsintownOffer[];
  url: string;
}

export async function getUpcomingEvents(
  limit?: number
): Promise<BandsintownEvent[]> {
  const appId = process.env.BANDSINTOWN_APP_ID;
  if (!appId) return [];

  try {
    const res = await fetch(
      `https://rest.bandsintown.com/artists/id_2410772/events?app_id=${appId}`,
      { next: { revalidate: 21600 } }
    );

    if (!res.ok) return [];

    const data: BandsintownApiEvent[] = await res.json();
    if (!Array.isArray(data)) return [];

    const events: BandsintownEvent[] = data.map((e) => {
      const dt = new Date(e.datetime);
      const location = e.venue.region
        ? `${e.venue.city}, ${e.venue.region}`
        : `${e.venue.city}, ${e.venue.country}`;

      const ticketOffer = e.offers?.find(
        (o) => o.type === 'Tickets' && o.url
      );

      return {
        date: dt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        time: dt.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        venue: e.venue.name,
        city: location,
        ticketUrl: ticketOffer?.url || e.url,
        eventUrl: e.url,
      };
    });

    return limit ? events.slice(0, limit) : events;
  } catch {
    return [];
  }
}
