import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useBatch } from '../hooks/useBatch';
import StepIndicator from '../components/ui/StepIndicator';
import ProcessingButton from '../components/ui/ProcessingButton';
import CustomerDataTable from '../components/ui/CustomerDataTable';

// Add this import for the chart
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FraudDetection = () => {
  const navigate = useNavigate();
  const { currentStep, isProcessing, processStep } = useAppContext();
  const { selectedBatch, batchId } = useBatch();

  if (!selectedBatch) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Batch not found</p>
      </div>
    );
  }

  const handleNextStep = (nextPath) => {
    navigate(`/batch/${selectedBatch.id}/${nextPath}`);
  };

  // Sample customer data
  const customerData = [
    {
      customer_id: 'CUST_000012',
      city: 'Chennai',
      pincode: '994751',
      document_quality_score: 0.168,
      document_consistency_score: 0.144,
      biometric_verification_score: 0.155,
      address_verification_result: 'Partial',
      identity_match_score: 0.401,
      document_metadata_consistency: 0.149,
      income_verification_result: 'Verified',
      income_profession_alignment: 0.424,
      banking_history_months: 2,
      financial_distress_indicators: 5,
      credit_score: 607,
      debt_to_income_ratio: 0.819,
      premium_to_income_ratio: 0.308,
      social_media_presence_score: 0.292,
      digital_footprint_consistency: 0.145,
      employment_verification_result: 'Not Verified',
      professional_credential_validation: 'Invalid',
      digital_presence_age_months: 115,
      digital_reputation_score: 0.057,
      identity_verification_composite: 0.217,
      financial_risk_score: 0.523,
      digital_consistency_score: 0.165,
      identity_financial_mismatch: 0.26,
      is_fraud: 1
    },
    {
      customer_id: 'CUST_000013',
      city: 'Mumbai',
      pincode: '400001',
      document_quality_score: 0.892,
      document_consistency_score: 0.876,
      biometric_verification_score: 0.934,
      address_verification_result: 'Verified',
      identity_match_score: 0.912,
      document_metadata_consistency: 0.889,
      income_verification_result: 'Verified',
      income_profession_alignment: 0.823,
      banking_history_months: 48,
      financial_distress_indicators: 0,
      credit_score: 782,
      debt_to_income_ratio: 0.234,
      premium_to_income_ratio: 0.156,
      social_media_presence_score: 0.745,
      digital_footprint_consistency: 0.823,
      employment_verification_result: 'Verified',
      professional_credential_validation: 'Valid',
      digital_presence_age_months: 67,
      digital_reputation_score: 0.834,
      identity_verification_composite: 0.901,
      financial_risk_score: 0.123,
      digital_consistency_score: 0.789,
      identity_financial_mismatch: 0.045,
      is_fraud: 0
    },
    {
      customer_id: 'CUST_000014',
      city: 'Delhi',
      pincode: '110001',
      document_quality_score: 0.234,
      document_consistency_score: 0.198,
      biometric_verification_score: 0.267,
      address_verification_result: 'Failed',
      identity_match_score: 0.345,
      document_metadata_consistency: 0.201,
      income_verification_result: 'Failed',
      income_profession_alignment: 0.123,
      banking_history_months: 1,
      financial_distress_indicators: 8,
      credit_score: 456,
      debt_to_income_ratio: 0.923,
      premium_to_income_ratio: 0.445,
      social_media_presence_score: 0.134,
      digital_footprint_consistency: 0.089,
      employment_verification_result: 'Not Verified',
      professional_credential_validation: 'Invalid',
      digital_presence_age_months: 23,
      digital_reputation_score: 0.023,
      identity_verification_composite: 0.234,
      financial_risk_score: 0.789,
      digital_consistency_score: 0.112,
      identity_financial_mismatch: 0.567,
      is_fraud: 1
    },
    {
      customer_id: 'CUST_000015',
      city: 'Bangalore',
      pincode: '560001',
      document_quality_score: 0.756,
      document_consistency_score: 0.723,
      biometric_verification_score: 0.812,
      address_verification_result: 'Verified',
      identity_match_score: 0.789,
      document_metadata_consistency: 0.734,
      income_verification_result: 'Verified',
      income_profession_alignment: 0.678,
      banking_history_months: 36,
      financial_distress_indicators: 1,
      credit_score: 698,
      debt_to_income_ratio: 0.345,
      premium_to_income_ratio: 0.234,
      social_media_presence_score: 0.567,
      digital_footprint_consistency: 0.645,
      employment_verification_result: 'Verified',
      professional_credential_validation: 'Valid',
      digital_presence_age_months: 89,
      digital_reputation_score: 0.623,
      identity_verification_composite: 0.756,
      financial_risk_score: 0.234,
      digital_consistency_score: 0.612,
      identity_financial_mismatch: 0.123,
      is_fraud: 0
    },
    {
      customer_id: 'CUST_000016',
      city: 'Hyderabad',
      pincode: '500001',
      document_quality_score: 0.123,
      document_consistency_score: 0.089,
      biometric_verification_score: 0.134,
      address_verification_result: 'Failed',
      identity_match_score: 0.234,
      document_metadata_consistency: 0.098,
      income_verification_result: 'Failed',
      income_profession_alignment: 0.156,
      banking_history_months: 0,
      financial_distress_indicators: 12,
      credit_score: 389,
      debt_to_income_ratio: 1.234,
      premium_to_income_ratio: 0.789,
      social_media_presence_score: 0.067,
      digital_footprint_consistency: 0.045,
      employment_verification_result: 'Failed',
      professional_credential_validation: 'Invalid',
      digital_presence_age_months: 12,
      digital_reputation_score: 0.012,
      identity_verification_composite: 0.145,
      financial_risk_score: 0.923,
      digital_consistency_score: 0.056,
      identity_financial_mismatch: 0.834,
      is_fraud: 1
    }
  ];

  // Top 10 feature importance (hardcoded as per image)
  const featureImportance = useMemo(() => [
    { feature: 'premium_to_income_ratio', importance: 0.19 },
    { feature: 'financial_risk_score', importance: 0.19 },
    { feature: 'credit_score', importance: 0.18 },
    { feature: 'banking_history_months', importance: 0.155 },
    { feature: 'financial_distress_indicators', importance: 0.125 },
    { feature: 'debt_to_income_ratio', importance: 0.08 },
    { feature: 'identity_verification_composite', importance: 0.035 },
    { feature: 'document_quality_score', importance: 0.02 },
    { feature: 'document_consistency_score', importance: 0.015 },
    { feature: 'identity_match_score', importance: 0.013 },
  ], []);

  const chartData = useMemo(() => ({
    labels: featureImportance.map(f => f.feature),
    datasets: [
      {
        label: 'Importance',
        data: featureImportance.map(f => f.importance),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  }), [featureImportance]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value, index) {
            // Show feature names at an angle
            return this.getLabelForValue(value);
          },
          color: '#374151',
          font: { size: 12 },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        max: 0.2,
        ticks: {
          color: '#374151',
          font: { size: 12 },
        },
        title: {
          display: false,
        },
      },
    },
  }), []);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Step Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StepIndicator
          stepNumber={1}
          title="Fraud Detection"
          isActive={currentStep === 1}
          isCompleted={selectedBatch.results.fraudDetection !== null}
          isDisabled={false}
          batchId={selectedBatch.id}
          stepPath="fraud-detection"
        />
        <StepIndicator
          stepNumber={2}
          title="Market Intelligence"
          isActive={currentStep === 2}
          isCompleted={selectedBatch.results.marketIntel !== null}
          isDisabled={selectedBatch.results.fraudDetection === null}
          batchId={selectedBatch.id}
          stepPath="market-intelligence"
        />
        <StepIndicator
          stepNumber={3}
          title="Customer Search"
          isActive={false}
          isCompleted={selectedBatch.results.customerSearch !== null}
          isDisabled={selectedBatch.results.marketIntel === null}
          batchId={selectedBatch.id}
          stepPath="customer-search"
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Step 1: Fraud Detection</h2>
            <p className="text-gray-600">Batch: {selectedBatch.name} ({selectedBatch.id})</p>
          </div>
          
          <div className="flex items-center gap-3">
            <ProcessingButton
              currentStep={currentStep}
              selectedBatch={selectedBatch}
              isProcessing={isProcessing}
              onProcessStep={() => processStep(batchId)}
              onNextStep={handleNextStep}
            />
          </div>
        </div>
      </div>

      

      {/* Results */}
      {selectedBatch.results.fraudDetection && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{selectedBatch.results.fraudDetection.processed.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Fraud Cases</p>
              <p className="text-2xl font-bold text-red-600">{selectedBatch.results.fraudDetection.fraudDetected}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Fraud Rate</p>
              <p className="text-2xl font-bold text-green-600">{selectedBatch.results.fraudDetection.accuracy}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Average Fraud Probability</p>
              <p className="text-2xl font-bold text-green-600">{selectedBatch.results.fraudDetection.accuracy}</p>
            </div>
          </div>
        </div>
      )}

      

      {selectedBatch.results.fraudDetection && (
        <CustomerDataTable 
          data={customerData}
          onExportCSV={console.log("Export CSV clicked")}
        />
      )}

      {/* Feature Importance Chart */}
      {selectedBatch.results.fraudDetection &&(<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Top 10 Feature Importance (Random Forest)
        </h3>
        <div className="w-full overflow-x-auto">
          <div style={{ minWidth: 350, maxWidth: 1000, width: '100%' }}>
            <Bar data={chartData} options={chartOptions} height={180} />
          </div>
        </div>
      </div>  )}
      
    </div>
  );
};

export default FraudDetection;