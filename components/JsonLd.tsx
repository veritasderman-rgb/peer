/* Strukturovaná data (schema.org) pro vyhledávače a AI asistenty. Jeden <script type="application/ld+json">
   na objekt; obsah je z našich dat, ne z uživatelského vstupu. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
