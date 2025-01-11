import { RenderMode, ServerRoute } from '@angular/ssr';
/**
 *  file is specific to Angular Server-Side Rendering (SSR).
 * SSR is powered by Angular's Universal framework, allowing Angular applications to run on the server (typically with Node.js).
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
