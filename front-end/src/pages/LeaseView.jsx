import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import SignatureCanvas from "react-signature-canvas";
import "../styles/LeaseViewStyles.css";

function LeaseView({ leaseData }) {
  if (!leaseData) {
    return <div>No lease data available</div>;
  }

  const { tenantInformation } = leaseData;

  const MyDocument = () => (
    <Document>
      <Page size="A4" className="page">
        <Text className="title">Lease Agreement</Text>
        <View className="section">
          <Text className="bold-content">Parties Involved:</Text>
          <Text className="content">Tenant Name : {tenantInformation.tenantName}</Text>
        </View>
        <View ClassName="section">
          <Text className="bold-content">Lease Start Date:</Text>
          <Text className="content">{leaseData.leaseStartDate}</Text>
        </View>
        <View className="section">
          <Text className="bold-content">Lease End Date:</Text>
          <Text className="content">{leaseData.leaseEndDate || "December 31, 2025"}</Text>
        </View>
        <View className="section">
          <Text className="bold-content">Rent Amount:</Text>
          <Text className="content">${leaseData.rentAmount || "1500"} per month</Text>
        </View>
        <View className="section">
          <Text className="bold-content">Terms and Conditions:</Text>
          <Text className="content">The tenant agrees to maintain the property in good condition...</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="layout-container">
      <h1 className="header">Lease Agreement Preview</h1>
      <div className="viewer-container">
        {/* Embedding the PDF viewer in the page */}
        <PDFViewer className="pdf-viewer">
          <MyDocument />
        </PDFViewer>
      </div>
      <SignatureCanvas penColor="green" canvasProps={{ width: 500, height: 200, className: "sigCanvas" }} />

      <div className="button-container">
        <Button variant="contained" endIcon={<SendIcon />}>
          Email Lease
        </Button>
      </div>
    </div>
  );
}

export default LeaseView;
