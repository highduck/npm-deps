#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include <benchmark/benchmark.h>

static void BM_SomeFunction(benchmark::State& state) {
    // Perform setup here
    for (auto _ : state) {
        // This code gets timed
        sinf(-1.0f);
    }
}

// Register the function as a benchmark
BENCHMARK(BM_SomeFunction);

// Run the benchmark
BENCHMARK_MAIN();