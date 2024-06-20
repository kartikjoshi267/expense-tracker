import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Expense from "../models/expense.model";
import { Response } from "express";
import { randomUUID } from "crypto";

class PDFService {
  public static async generatePDFFromExpenses(userId: string, res: Response) {
    const expenses = await Expense.find({ user: userId }).populate("source");
    let doc = new jsPDF();

    // Add text to the PDF
    doc.text("Expenses Report", 10, 10);
    doc.text("Expenses", 10, 20);

    // Format the expenses data for the table
    const tableData = expenses.sort((a:any, b:any) => {
      if (new Date(a.date).getTime() === new Date(b.date).getTime()) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).map((expense: any, index: number) => {
        return [
            (index + 1).toString(),
            expense.title,
            expense.description,
            expense.amount,
            new Date(expense.date).toDateString(),
            expense.source.name
        ];
    });

    // Add the table to the PDF
    // @ts-ignore
    autoTable(doc, {
        startY: 30,
        head: [["S.No", "Title", "Description", "Amount", "Date", "Source"]],
        body: tableData
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=ExpensesReport-${randomUUID()}.pdf`);
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.send(doc.output());
  }
}

export default PDFService;