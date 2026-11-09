# testmaker

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gokhangunduz/testmaker/blob/main/LICENSE)

testmaker is a tool specifically designed for professionals and educators who prepare educational materials. This project facilitates the quick and efficient conversion of image-based questions into PDF files.

## Features

- **Quick Conversion:** Converts images to PDF quickly.
- **Private:** Everything runs in your browser, no image is ever uploaded.
- **User-Friendly Interface:** Easy-to-use and intuitive user interface.
- **Supports Various Formats:** PNG, JPEG, WebP, GIF, BMP, AVIF, SVG, TIFF and HEIC. Every image is converted to a clean PNG on upload (large noisy photos become a right-sized JPEG), so whatever you add prints correctly. Cut-off or corrupt files are rejected by name instead of ending up half-drawn in the PDF.
- **Drag & Drop:** Reorder questions with drag and drop support.
- **Multi-language:** Supports Turkish, English and German.
- **Answer Key:** Generates a separate answer key page in the PDF.
- **Image Editor:** Crop and adjust question images before export.
- **Autosave:** Your work is stored in the browser (IndexedDB) and restored on reload, even if you reload right after an edit. Changing the project in a second tab is detected so nothing gets overwritten.
- **Undo:** Removing a question, clearing everything or resetting the settings can be undone.
- **Unicode PDFs:** The PDF embeds Noto Sans, so Turkish, German and other Latin characters print correctly.
- **Responsive:** Tabs on phones and portrait tablets, editor plus live preview side by side on landscape tablets, three columns on desktop. Touch-sized controls on touch screens.
- **Paste Images:** Paste screenshots straight from the clipboard with Ctrl+V.
- **Bulk Answer Key:** Fill every answer at once by typing e.g. `ABCDE-A`.
- **Duplicate & Clear:** Duplicate a question or clear the whole test (with confirmation).

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [HeroUI v3](https://heroui.com/)
- [@react-pdf/renderer](https://react-pdf.org/)
- [dnd kit](https://dndkit.com/)
- [i18next](https://www.i18next.com/)
- [react-advanced-cropper](https://advanced-cropper.github.io/react-advanced-cropper/)

## Credits

The PDF font is [Noto Sans](https://github.com/notofonts/latin-greek-cyrillic) (SIL Open Font License, see `public/fonts/LICENSE.txt`).

## Installation

Follow these steps to install the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gokhangunduz/testmaker.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd testmaker
   ```

3. **Install the necessary packages:**

   ```bash
   npm install
   ```

## Usage

To start the project, run:

```bash
npm run dev
```

Then, open your browser and go to `http://localhost:3000`.

Other scripts:

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run build` | Creates the static production export (`out`) |
| `npm run start` | Serves the production build                  |
| `npm run lint`  | Runs ESLint                                  |

> TypeScript is pinned to 6.x because `typescript-eslint` does not support TypeScript 7 yet.

## Contributing

We welcome contributions! Please submit a pull request or open an issue to contribute.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](https://github.com/gokhangunduz/testmaker/blob/main/LICENSE) file.

## Contact

For any questions or suggestions, you can contact me through GitHub.
