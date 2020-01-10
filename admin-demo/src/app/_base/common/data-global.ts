export class DataGlobal {
    public static getImgFile(name: any) {
        if (name.toLowerCase().indexOf('.doc') !== -1 || name.toLowerCase().indexOf('.docx') !== -1) {
            return 'assets/images/typefile/doc.png';
        } else if (name.toLowerCase().indexOf('.xls') !== -1 || name.toLowerCase().indexOf('.xlsx') !== -1) {
            return 'assets/images/typefile/xls.png';
        } else if (name.toLowerCase().indexOf('.ppt') !== -1 || name.toLowerCase().indexOf('.pptx') !== -1) {
            return 'assets/images/typefile/ppt.png';
        } else if (name.toLowerCase().indexOf('.pdf') !== -1) {
            return 'assets/images/typefile/pdf.png';
        } else if (name.toLowerCase().indexOf('.xml') !== -1) {
            return 'assets/images/typefile/xml.png';
        } else if (name.toLowerCase().indexOf('.mp4') !== -1) {
            return 'assets/images/typefile/mp4.png';
        } else if (name.toLowerCase().indexOf('.zip') !== -1) {
            return 'assets/images/typefile/zip.png';
        } else if (name.toLowerCase().indexOf('.rar') !== -1) {
            return 'assets/images/typefile/rar.png';
        } else {
            return name;
        }
    }
}
