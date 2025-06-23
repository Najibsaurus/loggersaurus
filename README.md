# 🦖 Loggersaurus - Next.js Structured Logger
A simple, structured, and configurable logger for Next.js applications.

## Features

-   ✅ Structured JSON logging for production.
-   🎨 Pretty, color-coded logging for development.
-   ⚙️ Configurable service name.
-   🌐 Client-side logging.

## Installation

```bash
npm i @najibsaurus/loggersaurus
```

## Example
### Setup (Optional)
To use client-side logging, you must create an API route in your Next.js application that listens for logs and uses the server-side logger to process them.

```bash
//Create the file on : app/api/log/route.ts

import { NextResponse } from "next/server";
import { Logger, LogLevel } from "@najibsaurus/loggersaurus";

const logger = new Logger({ service: "my-app" });

export async function POST(request: Request) {
  try {
    const { level, action, details } = await request.json();

    if (!level || !action || !Object.values(LogLevel).includes(level)) {
      return NextResponse.json(
        { message: "Invalid log format" },
        { status: 400 }
      );
    }

    logger[level.toLowerCase() as "info" | "warn"]({ action, details });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process client log:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```
Fire the API :
```bash
curl  -X POST \
  'http://localhost:3000/api/log' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "action": "SUBMIT_FORM",
  "level": "INFO",
  "details": {
    "input": "some-data"
  }
}'
```
<br />

### Server-Side Usage
For API Routes, Server Actions, or ```getServerSideProps```.

```bash
import { logger } from "@najibsaurus/loggersaurus";

export async function GET() {
  logger.info({
    action: "MY_SERVER_ACTION_START",
    details: { input: "some-data" },
  });

  try {
    // ... do something awesome!
    logger.info({ action: "MY_SERVER_ACTION_SUCCESS" }); 
  } catch (e) {
    logger.error({
      action: "MY_SERVER_ACTION_FAILED",
      details: { error: e instanceof Error ? e.message : String(e) },
    });
  }
}

```

Result:
```bash
[INFO] - MY_SERVER_ACTION_START {
  timestamp: '2025-06-23T09:17:05.288Z',
  level: 'INFO',
  service: 'next-app',
  action: 'MY_SERVER_ACTION_START',
  details: { input: 'some-data' }
}
```

<br />

### Client-Side Usage
For components marked with ```"use client"```.
```bash
"use client"
import { clientLogger } from '@najibsaurus/loggersaurus/client'; 


export function MyButton() {
  const handleClick = () => {
    clientLogger.info({
      action: 'USER_CLICKED_MY_BUTTON',
      details: { timestamp: Date.now() }
    });
    alert('Action logged! Check your server console.');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

<br />

### Additional
You can create your own logger instance for more control.

```bash
import { Logger } from "@najibsaurus/loggersaurus";

const customLogger = new Logger({ service: 'api-module' });
customLogger.info({ action: 'MODULE_INITIALIZED' });
```

<br />

###### From [Sleman](https://maps.app.goo.gl/NdzH3eYMPwTcXtfK9) with ❤️


