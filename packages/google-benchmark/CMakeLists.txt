cmake_minimum_required(VERSION 3.13)
project(benchmark)

add_library(${PROJECT_NAME} STATIC
        src/benchmark.cc
        src/commandlineflags.cc
        src/benchmark_name.cc
        src/benchmark_api_internal.cc
        src/benchmark_register.cc
        src/benchmark_runner.cc
        src/reporter.cc
        src/json_reporter.cc
        src/csv_reporter.cc
        src/console_reporter.cc
        src/timers.cc
        src/sysinfo.cc
        src/sleep.cc
        src/statistics.cc
        src/counter.cc
        src/complexity.cc
        src/colorprint.cc
        src/string_util.cc
        )
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)
target_include_directories(${PROJECT_NAME} PUBLIC ./include)

if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
    target_link_libraries(${PROJECT_NAME} PRIVATE -lpthread)
elseif (${CMAKE_SYSTEM_NAME} MATCHES "Windows")
    target_link_libraries(${PROJECT_NAME} PRIVATE -lshlwapi)
endif ()

project(benchmark_main)
add_library(${PROJECT_NAME} STATIC
        src/benchmark_main.cc
        )
target_link_libraries(benchmark_main PUBLIC benchmark)

# npm package name mapping:
# @ekx/google-benchmark -> ekx::google-benchmark
add_library(ekx::google-benchmark ALIAS benchmark_main)
