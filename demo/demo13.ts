// This example shows 3 styles using XML styles
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { Document, HeadingLevel, Packer, Paragraph } from "../build";

const styles = fs.readFileSync("./demo/assets/custom-styles.xml", "utf-8");
const doc = new Document({
    title: "Title",
    externalStyles: styles,
});

doc.addParagraph(new Paragraph({
    text: "Cool Heading Text",
    heading: HeadingLevel.HEADING_1,
}));

const paragraph = new Paragraph({
    text: 'This is a custom named style from the template "MyFancyStyle"',
    style: "MyFancyStyle",
});
doc.addParagraph(paragraph);

doc.addParagraph(new Paragraph("Some normal text"));

doc.addParagraph(new Paragraph({
    text: "MyFancyStyle again",
    style: "MyFancyStyle",
}));

doc.addParagraph(paragraph);

const packer = new Packer();

packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});