import jsPDF from "jspdf";

export function addHeaderPage(doc: jsPDF): jsPDF
{
    doc.setFontSize(14);
    doc.text('Estado individual de cartera', 15, 42);
    doc.setFontSize(11);

    return doc;
}