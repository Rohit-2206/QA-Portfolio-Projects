
import asyncio
from copilot import CopilotClient


async def main():
    client = CopilotClient(mode="coding-agent")

    try:
        await client.start()
        print("Copilot SDK connected successfully!")
    finally:
        await client.stop()


asyncio.run(main())
