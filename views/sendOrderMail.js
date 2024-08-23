<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Created Successfully</title>

    <style type="text/css">
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        td {
            padding: 1rem 2rem;
            vertical-align: top;
            width: 100%;
        }

        .container {
  
           
            max-width: 900px;
            margin: 0 auto;
            text-align: left;
            background-color: #ffffff;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
        }

        .header-logo {
            background-color: #00373E;
            text-align: center;
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
        }

        .header-logo h2 {
            margin: 0;
        }

        .content {
            padding: 40px;
            background-color: #f8f8f8;
        }

        h1 {
            margin: 1rem 0;
            color: #333333;
        }

        strong {
            font-size: 110%;
            color: #555555;
        }

        .otp {
            font-size: 24px;
            color: #007bff;
            margin: 0;
        }

        .info-message {
            color: #555555;
            font-size: 17px;

        }

        .footer {
            padding: 10px;
            color: #999999;
            text-align: center;
            background-color: #f8f8f8;
            border-radius: 0 0 12px 12px;
            font-size: 18px;

        }
    </style>
</head>

<body>
    <table role="presentation" style="border-spacing: 0;">
        <tr>
            <td>
                <table class="container">
                    <tr>
                        <td class="header-logo">
                            <h2>Petheeds</h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <div style="color: #333333; text-align: left;">
                                <h1 style="color:green">Order Created Successfully</h1>
                                <p class="info-message">Thank you for placing an order with Wild Himalaya. We are pleased to confirm that we have received your order # <strong>
                                    <%= orderId%>
                                </strong>  with a total amount of <strong>
                                    ₹<%= amount%>
                                </strong>, placed on <strong>
                                    <%= date%>
                                </strong>. Your order is now being processed and we will ensure its prompt dispatch.</p>

                                <p class="info-message">Payment Mode: <strong><%= paymentType%></strong></p>
                                
                                <p class="info-message">We appreciate your business and are committed to providing you with the best service possible. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                               
                              
                                <p>Thanks,<br>The Wild Himalaya Team</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>© All copyrights reserved to @Wild Himalaya 2024.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>