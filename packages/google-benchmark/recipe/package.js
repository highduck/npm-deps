const {downloadFiles} = require('@ekx/cli-utils');

async function run() {
    console.info("Download google benchmark");
    await downloadFiles({
        srcBaseUrl: "https://github.com/google/benchmark/raw/main",
        fileList: [
            "include/benchmark/benchmark.h",
            "src/arraysize.h",
            "src/benchmark_api_internal.cc",
            "src/benchmark_api_internal.h",
            "src/benchmark_main.cc",
            "src/benchmark_name.cc",
            "src/benchmark_register.cc",
            "src/benchmark_register.h",
            "src/benchmark_runner.cc",
            "src/benchmark_runner.h",
            // "src/benchmark_adjust_repetitions.cc",
            // "src/benchmark_adjust_repetitions.h",
            "src/benchmark.cc",
            "src/check.h",
            "src/colorprint.cc",
            "src/colorprint.h",
            "src/commandlineflags.cc",
            "src/commandlineflags.h",
            "src/complexity.cc",
            "src/complexity.h",
            "src/console_reporter.cc",
            "src/counter.cc",
            "src/counter.h",
            "src/csv_reporter.cc",
            "src/cycleclock.h",
            "src/internal_macros.h",
            "src/json_reporter.cc",
            "src/log.h",
            "src/mutex.h",
            "src/re.h",
            "src/reporter.cc",
            "src/sleep.cc",
            "src/sleep.h",
            "src/statistics.cc",
            "src/statistics.h",
            "src/string_util.cc",
            "src/string_util.h",
            "src/sysinfo.cc",
            "src/thread_manager.h",
            "src/thread_timer.h",
            "src/timers.cc",
            "src/timers.h",
            "src/perf_counters.h",
            "src/perf_counters.cc",
        ]
    });
    console.info("Packaging done: google benchmark");
}

run().catch(() => process.exit(1));