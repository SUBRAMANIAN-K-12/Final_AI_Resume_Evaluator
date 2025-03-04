import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generateResume = (values) => {
  const doc = new jsPDF();
  doc.setFont("Helvetica");
  doc.setFontSize(18);

  // Function to check for "N/A"
  const filterNA = (data) => data && data !== "Null";

  // Collect all values and check if any contain "N/A"
  const allValues = Object.values(values || {});
  if (allValues.some(val => val === "N/A")) {
    alert("Some fields contain 'meaningless content'. Please update your information before generating the resume.");
    return; // Stop PDF generation
  }

  const fullName = `${values?.firstName || ''} ${values?.lastName || ''}`.trim() || "Resume";
  doc.text(fullName, 90, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let currentY = 40;

  // Personal Details
  const personalDetails = [
    ['Mobile Number:', values?.mobileNumber],
    ['Date of Birth:', values?.dateOfBirth],
    ['Address:', values?.presentAddress]
  ].filter(item => filterNA(item[1]));

  if (filterNA(values?.email) || filterNA(values?.linkedinProfile)) {
    let emailText = `Email: ${values.email || ''}`;
    let linkedinText = values.linkedinProfile ? ` | LinkedIn: ${values.linkedinProfile}` : '';
    doc.text(emailText + linkedinText, 20, currentY);
    currentY += 10;
  }

  if (filterNA(values?.profile)) {
    doc.setFontSize(14);
    doc.autoTable({ 
      startY: currentY + 10, 
      head: [['Career Objectives']], 
      body: [[values.profile]], 
      theme: 'striped', 
      styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, 
      margin: { left: 20, right: 20 }
    });
    currentY = doc.autoTable.previous.finalY + 10;
  }

  if (personalDetails.length) {
    doc.autoTable({ startY: currentY, head: [['Personal Details', '']], body: personalDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  // Education Details
  const educationDetails = [
    ['Field of Study:', values?.branch],
    ['College Name:', values?.college],
    ['Percentage:', filterNA(values?.percentage) ? `${values.percentage}` : ''],
    ['Passing Year:', values?.passingYear]
  ].filter(item => filterNA(item[1]));

  if (educationDetails.length) {
    doc.setFontSize(14);
    doc.text("Highest Qualification", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: educationDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  // Save the PDF
  const projectDetails = [
    ['Project:', values?.project],
    ['Project Description:', values?.projectDescription]
  ].filter(item => filterNA(item[1]));

  if (projectDetails.length) {
    doc.setFontSize(14);
    doc.text("Projects", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: projectDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }
  
  if (filterNA(values?.skills)) {
    doc.setFontSize(14);
    doc.text("Skills", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Skills']], body: [[values.skills]], theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  const certifications = [
    ['Technical Certifications:', values?.technicalCertifications],
    ['Internship Certifications:', values?.internshipCertifications]
  ].filter(item => filterNA(item[1]));

  if (certifications.length) {
    doc.setFontSize(14);
    doc.text("Certifications", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Certification Type', 'Details']], body: certifications, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  if (filterNA(values?.yearsOfExperience) && values.yearsOfExperience > 0) {
    doc.setFontSize(14);
    doc.text("Experience", 20, currentY);
    const experienceDetails = [
      ['Years of Experience:', values.yearsOfExperience],
      ['Experience Details:', values.experienceDetails]
    ].filter(item => filterNA(item[1]));
    
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: experienceDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  doc.save(`${fullName}_Resume.pdf`);
  console.log("Resume PDF generated successfully!");
};

export default generateResume;
