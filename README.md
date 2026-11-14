# Aaryan Chaurasia — Sustainability Portfolio

Static portfolio website for Aaryan Chaurasia.

## Website files

The complete site is in [`outputs/`](outputs/), including the homepage, expertise pages, case studies, styles, scripts, and media assets.

## GitHub Pages deployment

The site is plain HTML, CSS, JavaScript, and assets. It does not need a Next.js build step or server runtime. The workflow at [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publishes the contents of `outputs/` as the Pages site.

The deployment workflow is prepared on the `prepare-pages-deployment` branch. It runs only when changes reach `main` (or when manually started from Actions after the workflow is on the default branch), so this branch does not deploy the site.

### Publish when ready

1. In the repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
2. Review and merge `prepare-pages-deployment` into `main`. The merge triggers the workflow.
3. In **Actions**, open the deployment run and wait for it to complete. GitHub Pages will show the published URL under **Settings → Pages**.

The repository is public, so the project site URL will be:

`https://aaryanchaurasia1998-sketch.github.io/aaryan-chaurasia-sustainability-portfolio/`

### Custom domain later

When a domain is ready, add it under **Settings → Pages → Custom domain**, then configure the DNS records GitHub displays. Keep HTTPS enabled after DNS verification.
