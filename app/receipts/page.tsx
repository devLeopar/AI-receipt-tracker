import React from 'react'
import PDFDropzone from '@/components/PDFDropzone'
// import ReceiptsList from '@/components/ReceiptsList'

function Receipts() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <PDFDropzone />
        {/* <ReceiptsList />  */}
      </div>
    </div>
  )
}

export default Receipts