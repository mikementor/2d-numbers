import React, { useState } from 'react';

const HelpModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <button
        className="fixed bottom-4 right-4 bg-gray-700 text-white px-3 py-2 rounded-full"
        onClick={handleModalOpen}
      >
        Help
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Hotkeys</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2"><kbd>Alt</kbd> + <kbd>→</kbd> - History - next</li>
              <li className="mb-2"><kbd>Alt</kbd> + <kbd>←</kbd> - History - previous</li>
            </ul>
            <button
              className="mt-4 bg-gray-700 text-white px-3 py-2 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpModal;