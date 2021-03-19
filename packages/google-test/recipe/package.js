const {downloadFiles} = require('@ekx/cli-utils');


function cookGoogleBenchmark() {
    console.info("Download google benchmark");
    return downloadFiles({
        srcBaseUrl: "https://github.com/google/benchmark/raw/master",
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
        ]
    });
}

function cookGoogleTest() {
    console.info("Download google test");
    return downloadFiles({
        srcBaseUrl: "https://github.com/google/googletest/raw/master/googletest",
        fileList: [
            "src/gtest-all.cc",
            "src/gtest.cc",
            "src/gtest-death-test.cc",
            "src/gtest-filepath.cc",
            "src/gtest-matchers.cc",
            "src/gtest-port.cc",
            "src/gtest-printers.cc",
            "src/gtest-test-part.cc",
            "src/gtest-typed-test.cc",
            "src/gtest_main.cc",
            "src/gtest-internal-inl.h",
            "include/gtest/gtest.h",
            "include/gtest/internal/gtest-internal.h",
            "include/gtest/internal/gtest-string.h",
            "include/gtest/internal/gtest-port.h",
            "include/gtest/internal/gtest-port-arch.h",
            "include/gtest/internal/gtest-filepath.h",
            "include/gtest/internal/gtest-type-util.h",
            "include/gtest/internal/gtest-param-util.h",
            "include/gtest/gtest_pred_impl.h",
            "include/gtest/internal/gtest-death-test-internal.h",
            "include/gtest/internal/custom/gtest-port.h",
            "include/gtest/internal/custom/gtest-printers.h",
            "include/gtest/internal/custom/gtest.h",
            "include/gtest/gtest-death-test.h",
            "include/gtest/gtest-matchers.h",
            "include/gtest/gtest-message.h",
            "include/gtest/gtest-param-test.h",
            "include/gtest/gtest-printers.h",
            "include/gtest/gtest_prod.h",
            "include/gtest/gtest-test-part.h",
            "include/gtest/gtest-typed-test.h",
            "include/gtest/gtest-spi.h",
        ]
    });
}

console.info("cwd:", process.cwd());
Promise.all([
    cookGoogleTest(),
    cookGoogleBenchmark()
]).then(function() {
    console.info("Packaging done: google test bundle");
});