@echo off
setlocal

:: Define location of control file
set "VariableFile=locations.txt"

:: Load control file values into variables
for /f "usebackq tokens=1* delims==" %%A in ("%VariableFile%") do set %%A=%%B

:: Display variable values loaded from control file
echo Values read were:
echo Path to Neo4J: %NEO4J%
echo Path to MongoDB: %MONGO_DB_PATH%
echo Path to MongoDB data: %MONGO_DB_DATA%
echo Path to .NET API: %NET_API%
echo Path to NodeJS API: %NODE_API%
echo. 
echo These values correct^?
echo.

pause

set NET_FULL_PATH=^"%NET_API:~1,-1%\SportUnite.Api^"
set NEO4J_FULL_PATH=^"%NEO4J:~1,-1%\bin\neo4j-ce.exe^"

start cmd.exe /C "%NEO4J_FULL_PATH% && exit"
start cmd.exe /C "%MONGO_DB_PATH:~1,-1%\bin\mongod.exe" --dbpath %MONGO_DB_DATA:~1,-1%
start cmd.exe /C "%NET_API:~1,2% && cd %NET_FULL_PATH% && dotnet run"
start cmd.exe /K "%NODE_API:~1,2% && cd %NODE_API% && npm start"



