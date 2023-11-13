package model.jaccard;

import com.atlantbh.internship.auction.app.model.impl.JaccardIndex;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.openjdk.jmh.annotations.*;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 9, time = 1)
@Fork(1)
public class JaccardIndexBenchmark {

    private static final List<String> names = new ArrayList<>();

    private static final String INPUT = "w shoes";

    private final JaccardIndex jaccardIndex = new JaccardIndex(INPUT);

    public static void main(String[] args) throws Exception {
        org.openjdk.jmh.Main.main(args);
    }

    @Setup
    public void setup() throws IOException {
        try (CSVParser parser = new CSVParser(
                new FileReader("auction-backend/src/test/benchmark/model/jaccard/MOCK_DATA_100_000.csv"),
                CSVFormat.DEFAULT)
        ) {
            for (var record : parser) {
                Collections.addAll(names, record.values());
            }
        }
    }

    @Benchmark
    public void jaccardSimilarity() {
        jaccardIndex.calculateSimilarity(names);
    }
}