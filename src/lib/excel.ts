import ExcelJS from "exceljs";

const BROWN = "6D4C41";
const LIGHT_BROWN = "F5F0ED";

export async function buildCorporateWorkbook(opts: {
  sheetName: string;
  title: string;
  subtitle?: string;
  columns: { header: string; width: number }[];
  rows: (string | number)[][];
}) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Özkar Grup Rent a Car";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(opts.sheetName, {
    views: [{ state: "frozen", ySplit: 4 }],
  });

  sheet.columns = opts.columns.map((c) => ({ width: c.width }));

  sheet.mergeCells(1, 1, 1, opts.columns.length);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = "ÖZKAR GRUP RENT A CAR";
  titleCell.font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(1).height = 28;
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${BROWN}` } };
  });

  sheet.mergeCells(2, 1, 2, opts.columns.length);
  const subtitleCell = sheet.getCell(2, 1);
  subtitleCell.value = opts.title + (opts.subtitle ? ` · ${opts.subtitle}` : "");
  subtitleCell.font = { italic: true, size: 11, color: { argb: "FF3E2723" } };
  subtitleCell.alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(2).eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${LIGHT_BROWN}` } };
  });

  sheet.mergeCells(3, 1, 3, opts.columns.length);
  const dateCell = sheet.getCell(3, 1);
  dateCell.value = `Oluşturulma Tarihi: ${new Date().toLocaleString("tr-TR")}`;
  dateCell.font = { size: 9, color: { argb: "FF8D6E63" } };
  dateCell.alignment = { vertical: "middle", horizontal: "center" };

  const headerRowIndex = 4;
  const headerRow = sheet.getRow(headerRowIndex);
  opts.columns.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${BROWN}` } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: "FFD7C4BC" } },
      bottom: { style: "thin", color: { argb: "FFD7C4BC" } },
      left: { style: "thin", color: { argb: "FFD7C4BC" } },
      right: { style: "thin", color: { argb: "FFD7C4BC" } },
    };
  });
  headerRow.height = 22;

  opts.rows.forEach((row, rowIndex) => {
    const excelRow = sheet.addRow(row);
    const isEven = rowIndex % 2 === 0;
    excelRow.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.font = { size: 10, color: { argb: "FF3E2723" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: isEven ? "FFFFFFFF" : `FF${LIGHT_BROWN}` },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE8DDD8" } },
        bottom: { style: "thin", color: { argb: "FFE8DDD8" } },
        left: { style: "thin", color: { argb: "FFE8DDD8" } },
        right: { style: "thin", color: { argb: "FFE8DDD8" } },
      };
    });
  });

  sheet.autoFilter = {
    from: { row: headerRowIndex, column: 1 },
    to: { row: headerRowIndex, column: opts.columns.length },
  };

  return workbook.xlsx.writeBuffer();
}
