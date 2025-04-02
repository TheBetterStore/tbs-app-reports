-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "receiptEmail" TEXT NOT NULL,
    "amountCharged" DECIMAL(10,2) NOT NULL,
    "netTotal" DECIMAL(10,4) NOT NULL,
    "grossTotal" DECIMAL(10,4) NOT NULL,
    "taxRate" DECIMAL(4,2) NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL,
    "lastUpdatedTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "stripePaymentIntentStatus" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderItemId" BIGSERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" VARCHAR(128) NOT NULL,
    "grossPrice" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderItemId")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
